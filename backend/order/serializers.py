from rest_framework import serializers
from .models import *
from product.models import *
from product.serializers import *


class OrderItemListSerializer(serializers.ModelSerializer):

    product = ProductSerializer()
    variant = VariantSerializer(allow_null=True)

 
    class Meta:
        model = OrderItem
        fields = ['product', 'variant', 'quantity', 'price']

class OrderListSerializer(serializers.ModelSerializer):
    items = OrderItemListSerializer(many=True)
 
    class Meta:
        model = Order
        fields = "__all__"
        

class OrderItemSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = OrderItem
        fields = ['product', 'variant', 'quantity', 'price']



class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    customer = serializers.EmailField()  # Accept email instead of ID


    class Meta:
        model = Order
        fields = ['customer', 'total', 'items']
        # read_only_fields = ['id', 'created_at', 'updated_at', 'status']

    def validate_customer(self, email):
        """Convert customer email to User ID"""
        try:
            user = User.object.get(email=email)
            return user
        except User.DoesNotExist:
            raise serializers.ValidationError("No user found with this email.")

    def create(self, validated_data):
        """Create order and related order items."""
        items_data = validated_data.pop('items')

        # Ensure the customer is passed as an ID
        customer_email = validated_data.pop('customer', None)
        customer = User.object.get(email=customer_email)
        if not customer:
            raise serializers.ValidationError({"customer": "Invalid customer email."})

        order = Order.objects.create(customer=customer, **validated_data)
        if not order:
            raise serializers.ValidationError({"customer": "Invalid customer email."})

        # Create order items
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        return order



