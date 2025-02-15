import decimal
from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
# Create your views here.

from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from cart.models import Cart
from user.models import User
from product.models import *
from product.serializers import *
from .models import Order
from .serializers import OrderSerializer, OrderListSerializer


class OrderAPIView(APIView):
    def get(self,request, order_id):
        """
        API view to  order get by ID
        """
        order  =  get_object_or_404(Order, id=order_id)
       
        return Response(OrderListSerializer(order).data)


class OrderPlaceAPIView(APIView):
    """
    API View to place an order
    """

    @transaction.atomic
    def post(self, request):
        data = request.data
        customer = User.object.get(email=data['customer'])
    

        # Retrieve the cart for the user
        cart = Cart.objects.filter(customer=customer).first()
        if not cart or not cart.items.exists():
            return Response({"detail": "Cart is empty or not found."}, status=status.HTTP_400_BAD_REQUEST)

        # Prepare order data
        items = []
        total_price = 0

        for cart_item in cart.items.all():
            print(f"TYPE CART ITEM {type(cart_item.product)}")
            print(f"DICt CART ITEM {cart_item.product.title}")
        
            item_data = {
                "product": {ProductSerializer(cart_item.product).data},
                "variant": {VariantSerializer(cart_item.variant)} if cart_item.variant else None,
                "quantity": cart_item.quantity,
                "price": cart_item.price,   
            }
            items.append(item_data)
            total_price += cart_item.price * cart_item.quantity

        # Create order
        order_data = {
            "customer": data['customer'],
            "total": total_price,
            "items": items,
        }
        serializer = OrderSerializer(data=order_data)
        if not serializer.is_valid():
            print("Validation Errors:", serializer.errors)  # Print errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        # Clear the cart
        cart.items.all().delete()

        print(f'ORDER RESPONSE{order}')
        return Response(OrderListSerializer(order).data)
