from rest_framework import serializers
from .models import *
from product.models import *
from product.serializers import *





class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=True)  # Nest ProductSerializer
    variant = VariantSerializer(many=True)  # Nest VariantSerializer
 
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


class OrderListSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
 
    class Meta:
        model = Order
        fields = "__all__"
        

class OrderItemInputSerializer(serializers.Serializer):
    customer = serializers.EmailField()
    product = serializers.CharField()
    variant = serializers.CharField(required=False, allow_null=True)
    price = serializers.CharField()
    # price = serializers.DecimalField(max_digits=10, decimal_places=2)
    quantity = serializers.IntegerField(min_value=1)

    def validate(self, data):
        # Validate customer email
        try:
            user = User.object.get(email=data['customer'])
        except User.DoesNotExist:
            raise serializers.ValidationError({'customer': 'No user found with this email.'})

        # Validate product
        try:
            product = Product.objects.get(sku=data['product'])
        except Product.DoesNotExist:
            raise serializers.ValidationError({'product': 'Product not found.'})

        # Validate variant if provided
        variant = None
        if data.get('variant'):
            try:
                variant = Variants.objects.get(sku=data['variant'], product=product)
            except Variants.DoesNotExist:
                raise serializers.ValidationError({'variant': 'Variant not found for this product.'})

        # Validate price
        if variant and data['price'] != str(variant.sale_price):
            raise serializers.ValidationError({'price': 'Price mismatch with the selected variant.'})
        elif not variant and data['price'] != str(product.price):
            raise serializers.ValidationError({'price': 'Price mismatch with the product.'})

        data['user'] = user
        data['product_obj'] = product
        data['variant_obj'] = variant
        return data

    def create(self, validated_data):
        # Retrieve or create Order
        
        order, _ = Order.objects.get_or_create(customer=validated_data['user'])
        
        # Add item to the Order
        order_item, created = OrderItem.objects.get_or_create(
            Order=Order,
            product=validated_data['product_obj'],
            variant=validated_data['variant_obj'],
            defaults={'quantity': validated_data['quantity'],'price': validated_data['variant_obj'].sale_price if validated_data['variant_obj'] else validated_data['product_obj'].price}
        )
        if not created:
            order_item.quantity += validated_data['quantity']
            order_item.save()

        order = Order.objects.get(customer=validated_data['user'])
        return  order      
