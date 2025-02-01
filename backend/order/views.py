from django.shortcuts import render
from rest_framework.views import APIView
# Create your views here.

from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from cart.models import Cart
from user.models import User
from .models import Order
from .serializers import OrderSerializer

class OrderPlaceAPIView(APIView):
    """
    API View to place an order
    """

    @transaction.atomic
    def post(self, request):

        print(request.user.id)
        data = request.data
        customer = User.object.get(email=data['customer'])
        print(f"DATA {customer}")

        # Retrieve the cart for the user
        cart = Cart.objects.filter(customer=customer).first()
        print(f"CART HAI {cart}")
        if not cart or not cart.items.exists():
            return Response({"detail": "Cart is empty or not found."}, status=status.HTTP_400_BAD_REQUEST)

        # Prepare order data
        items = []
        total_price = 0

        for cart_item in cart.items.all():
        
            item_data = {
                "product": cart_item.product.id,
                "variant": cart_item.variant.id if cart_item.variant else None,
                "quantity": cart_item.quantity,
                "price": cart_item.price,
            }
            items.append(item_data)
            total_price += cart_item.price * cart_item.quantity

        # Create order
        order_data = {
            "customer": customer,
            "total": total_price,
            "items": items,
        }
        serializer = OrderSerializer(data=order_data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()

        # Clear the cart
        cart.items.all().delete()

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
