from rest_framework import serializers
from .models import *
from product.models import *
from product.serializers import *




class OrderItemSerializer(serializers.ModelSerializer):
    # product_sku = serializers.CharField(source='product.sku', read_only=True)
    # variant_sku = serializers.CharField(source='variant.sku', read_only=True)
    product = ProductSerializer()  # Nest ProductSerializer
    variant = VariantSerializer()  # Nest VariantSerializer

    class Meta:
        model = OrderItem
        # fields = "__all__"
        # fields = ['product_sku', 'variant_sku', 'quantity', 'price']
        fields = ['product', 'variant', 'quantity', 'price']
        read_only_fields = ['created_at', 'updated_at']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)  # Nested serializer for Order items

    class Meta:
        model = Order
        fields = ['customer','total', 'items']
        read_only_fields = ['created_at', 'updated_at'] 

    def create(self, validated_data):
        print(f"Serializer Data {validated_data}")
        customer = validated_data['customer']
        product_sku = validated_data['product']
        variant_sku = validated_data.get('variant', None)
        quantity = validated_data['quantity']

        # Find product/variant
        if variant_sku:
            variant = Variants.objects.filter(sku=variant_sku).first()
            if not variant:
                raise serializers.ValidationError("Variant SKU is invalid.")
            product = variant.product
        else:
            product = Product.objects.filter(sku=product_sku).first()
            if not product:
                raise serializers.ValidationError("Product SKU is invalid.")
            variant = None

        # Get or create Order
        Order, _ = Order.objects.get_or_create(customer__email=customer)

        # Get or create Order item
        Order_item, created = OrderItem.objects.get_or_create(
            Order=Order,
            product=product,
            variant=variant,
            defaults={'quantity': quantity, 'price': variant.price if variant else product.price}
        )

        if not created:
            Order_item.quantity += quantity
            Order_item.save()

        return Order




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
