from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from order.models import Order
from .services.payoneer_service import PayoneerService
# Create your views here.



class CODPaymentAPIView(APIView):
    """
    API to place an order with Cash on Delivery (COD)
    """

    def post(self, request, order_id):
        order = get_object_or_404(Order, id=order_id, status="pending")
        order.payment_method = "cod"
        order.status = "pending"
        order.payment_status = "pending"
        order.save()

        return Response({"message": "Order placed with Cash on Delivery."}, status=status.HTTP_200_OK)




class CreditCardPaymentAPIView(APIView):
    """
    API to create payment request with Credit Card (via stripe)
    """
    def post(self,request, order_id):
        order = get_object_or_404(Order, id=order_id, status="pending" )

        payoneer_service =  PayoneerService()


        # Replace with the actual Payee ID from your system
        payee_id = request.data.get('payee_id')
        if not payee_id:
            return Response({'error': 'Payee ID is required'}, status=status.HTTP_400_BAD_REQUEST)

         # Make payment request
        payment_response = payoneer_service.make_payment(
            payee_id=payee_id,
            amount=str(order.total_price),
            currency="USD",
            description=f"Order {order.id} Payment"
        )

        # Check for errors
        if 'error' in payment_response:
            return Response(payment_response, status=status.HTTP_400_BAD_REQUEST)

        # Save payment details
        payment_method = PaymentMethod.objects.get(name='credit_card')
        payment = Payment.objects.create(
            order=order,
            payment_method=payment_method,
            transaction_id=payment_response.get('payment_id'),
            amount=order.total_price,
            status='completed'
        )
        
        order.status = 'processing'
        order.save()

        return Response(PaymentSerializer(payment).data, status=status.HTTP_201_CREATED)



class CreditCardCallbackAPIView(APIView):
    """
    API to handle Payoneer payment callback
    """

    def post(self, request):
        """
        Handle the callback request from Payoneer
        """
        # Extract data from callback
        transaction_id = request.data.get("transaction_id")
        order_id = request.data.get("order_id")
        payment_status = request.data.get("status")  # 'success' or 'failed'
        received_signature = request.headers.get("X-Payoneer-Signature")

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
        Validate the Payoneer signature to ensure callback authenticity
        """
        payload = "".join([f"{key}={value}" for key, value in sorted(data.items())])
        secret = settings.PAYONEER_CLIENT_SECRET
        calculated_signature = hmac.new(
            key=secret.encode(),
            msg=payload.encode(),
            digestmod=hashlib.sha256
        ).hexdigest()

        return hmac.compare_digest(calculated_signature, received_signature)



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