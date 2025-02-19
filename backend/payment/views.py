import requests
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from order.models import Order
# from .services.payoneer_service import PayoneerService
from django.conf import settings
# Create your views here.




class CODPaymentAPIView(APIView):
    """
    API to place an order with Cash on Delivery (COD)
    """

    def post(self, request, order_id):
        order = get_object_or_404(Order, id=order_id, status="pending")
        order.payment_method = "cod"
        order.status = "shipping"
        order.payment_status = "pending"
        order.save()

        return Response({"message": "Order placed with Cash on Delivery."})



class PayPalPaymentView(APIView):
    def post(self, request, order_id):
        order = Order.objects.get(id=order_id)
        
        # Get PayPal Access Token
        auth = (settings.PAYPAL_CLIENT_ID, settings.PAYPAL_SECRET)
        data = {'grant_type': 'client_credentials'}
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        auth_response = requests.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', data=data, headers=headers, auth=auth)
        access_token = auth_response.json().get('access_token')

        # Create PayPal Order
        headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {access_token}'}
        json_data = {
            "intent": "CAPTURE",
            "purchase_units": [{
                "amount": {
                    "currency_code": "USD",
                    "value": str(order.total)
                }
            }],
            "application_context": {
                "return_url": "http://localhost:3000/order-success",
                "cancel_url": "http://localhost:3000/payment-methods"
            }
        }
        response = requests.post('https://api-m.sandbox.paypal.com/v2/checkout/orders', json=json_data, headers=headers)
        print(response)
        if response.status_code == 201:
            order_data = response.json()
            approval_url = next(link['href'] for link in order_data['links'] if link['rel'] == 'approve')
            Payment.objects.create(order=order, method='paypal', payment_id=order_data['id'], status='created')
            return Response({'approval_url': approval_url})
        
        return Response({'error': 'Failed to create PayPal payment.'})

class CapturePayPalPaymentView(APIView):
    def post(self, request, payment_id):
        payment = Payment.objects.get(payment_id=payment_id)
        
        # Capture Payment
        access_token = request.headers.get('Authorization').split(' ')[1]
        headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {access_token}'}
        response = requests.post(f'https://api-m.sandbox.paypal.com/v2/checkout/orders/{payment_id}/capture', headers=headers)
        
        if response.status_code == 201:
            payment.status = 'completed'
            payment.save()
            payment.order.status = 'paid'
            payment.order.save()
            return Response({'message': 'Payment successful!'})
        
        return Response({'error': 'Payment capture failed.'})



class EasyPaisaPaymentAPIView(APIView):
    """
    API to create a payment request with EasyPaisa
    """

    def post(self, request, order_id):
        order = get_object_or_404(Order, id=order_id, status="pending")

        # Prepare payment request data for EasyPaisa
        payload = {
            "storeId": EASYPAY_STORE_ID,
            "orderId": str(order.id),
            "amount": str(order.total),
            "currency": "PKR",
            "customerEmail": order.customer.email,
            "callbackUrl": request.build_absolute_uri("/easypaisa-payment-confirm/"),
            "expiryDate": "2025-12-31",
        }

        headers = {
            "Authorization": f"Bearer {EASYPAY_AUTH_TOKEN}",
            "Content-Type": "application/json",
        }

        # Send request to EasyPaisa API
        response = requests.post(EASYPAY_PAYMENT_URL, json=payload, headers=headers)

        if response.status_code == 200:
            payment_response = response.json()
            order.payment_id = payment_response.get("transactionId")
            order.payment_method = "easypaisa"
            order.save()
            return Response({"payment_url": payment_response.get("payment_url")}, status=status.HTTP_200_OK)

        return Response({"error": "Failed to create payment request"}, status=status.HTTP_400_BAD_REQUEST)

class EasyPaisaCallbackAPIView(APIView):
    """
    API to handle EasyPaisa payment callback
    """

    def post(self, request):
        """
        Handle the callback request from EasyPaisa
        """
        # Extract data from callback
        transaction_id = request.data.get("transactionId")
        order_id = request.data.get("orderId")
        payment_status = request.data.get("status")  # 'success' or 'failed'
        received_signature = request.headers.get("X-EasyPaisa-Signature")

        # Get Order
        try:
            order = Order.objects.get(id=order_id, payment_id=transaction_id)
        except Order.DoesNotExist:
            return Response({"error": "Invalid order or transaction ID"}, status=status.HTTP_404_NOT_FOUND)

        # Validate Signature
        is_valid = self.validate_signature(request.data, received_signature)
        if not is_valid:
            return Response({"error": "Invalid signature"}, status=status.HTTP_400_BAD_REQUEST)

        # Update order status based on payment status
        if payment_status == "success":
            order.payment_status = "completed"
            order.status = "paid"
        else:
            order.payment_status = "failed"
            order.status = "pending"

        order.save()

        return Response({"message": "Payment status updated"}, status=status.HTTP_200_OK)

    def validate_signature(self, data, received_signature):
        """
        Validate the EasyPaisa signature to ensure callback authenticity
        """
        payload = "".join([f"{key}={value}" for key, value in sorted(data.items())])
        secret = settings.EASYPAY_AUTH_TOKEN
        calculated_signature = hmac.new(
            key=secret.encode(),
            msg=payload.encode(),
            digestmod=hashlib.sha256
        ).hexdigest()

        return hmac.compare_digest(calculated_signature, received_signature)