from django.shortcuts import render
from rest_framework.viewsets import  ModelViewSet, ViewSet
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Cart, CartItem
from user.models import User
from .serializers import CartSerializer, CartItemInputSerializer, CartItemSerializer

# Create your views here.



class CartViewSet(ViewSet):
    queryset = Cart.objects.prefetch_related('items').all()
    # serializer_class = CartSerializer
    # permission_classes = [IsAuthenticated]
    def list(self, request):
        # queryset = Cart.objects.prefetch_related('items').all()
        serializer = CartSerializer(self.queryset, many=True)
        return Response(serializer.data)
    
    
    @action(detail=False, methods=['get'],)
    def retrieve_cart(self, request, email=None):
        """
        Retrieve cart by user email
        """
        try:
            user = User.object.get(email=email)
            cart = Cart.objects.filter(customer=user).first()
            if not cart:
                return Response({"detail": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)

            serializer = CartSerializer(cart)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
   
    @action(detail=False, methods=['delete'],)
    def remove_item_cart(self, request, email=None):
        """
        Remove cart by user email
        """
        sku = request.data.get('sku')
        email = request.data.get('userInfo')
        user = User.object.get(email=email)
        print(sku,user)
        if not sku:
            return Response({'error': 'SKU is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Try to find by variant SKU first, then fallback to product SKU
            cart_item = CartItem.objects.filter(cart__customer=user).filter(
                variant__sku=sku
            ).first() or CartItem.objects.filter(cart__customer=user).filter(
                product__sku=sku
            ).first()

            if not cart_item:
                return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

            cart_item.delete()

            cart  = Cart.objects.get(customer=user)
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)


    @action(detail=False, methods=['post'])
    def add_to_cart(self, request):
        """
        Add item to cart
        """
        serializer = CartItemInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.is_valid():
            cart = serializer.save()
            # return Response(CartItemInputSerializer(cart).data)
            return Response(CartSerializer(cart).data)
                
        print(f"error {serializer.errors}")  # Log the errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['put'])
    def update_to_cart(self, request, email):
        """
        Update Quantity to cart
        """

        try:
            sku = request.data.get('sku')
            user  = User.object.get(email=email)
            cart_item = CartItem.objects.filter(cart__customer=user).filter(
                variant__sku=sku
            ).first() or CartItem.objects.filter(cart__customer=user).filter(
                product__sku=sku
            ).first()

            if not cart_item:
                return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

            new_quantity = request.data.get('qty')
            if not isinstance(new_quantity, int) or new_quantity <= 0:
                return Response(
                    {'error': 'Quantity must be a positive integer'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            cart_item.quantity = new_quantity
            cart_item.save()


            cart  = Cart.objects.get(customer=user)
            serializer = CartSerializer(cart)
            return Response(serializer.data)    
        except Exception as e:
             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    # @action(detail=False, methods=['delete'])
    # def delete_item(self, request, pk=None):
    #     cart = self.get_object()
    