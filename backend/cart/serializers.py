from rest_framework import serializers
from .models import *
from product.models import *
from product.serializers import *




class CartItemSerializer(serializers.ModelSerializer):
    # product_sku = serializers.CharField(source='product.sku', read_only=True)
    # variant_sku = serializers.CharField(source='variant.sku', read_only=True)
    product = ProductSerializer()  # Nest ProductSerializer
    variant = VariantSerializer()  # Nest VariantSerializer

    class Meta:
        model = CartItem
        # fields = "__all__"
        # fields = ['product_sku', 'variant_sku', 'quantity', 'price']
        fields = ['id','product', 'variant', 'quantity', 'price']
        read_only_fields = ['created_at', 'updated_at']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)  # Nested serializer for cart items

    class Meta:
        model = Cart
        fields = ['id', 'customer', 'created_at', 'updated_at', 'items']
        read_only_fields = ['created_at', 'updated_at']

    # def create(self, validated_data):
    #     print(f"Serializer Data {validated_data}")
        # customer = validated_data['customer']
        # product_sku = validated_data['product']
        # variant_sku = validated_data.get('variant', None)
        # quantity = validated_data['quantity']

        # # Find product/variant
        # if variant_sku:
        #     variant = Variants.objects.filter(sku=variant_sku).first()
        #     if not variant:
        #         raise serializers.ValidationError("Variant SKU is invalid.")
        #     product = variant.product
        # else:
        #     product = Product.objects.filter(sku=product_sku).first()
        #     if not product:
        #         raise serializers.ValidationError("Product SKU is invalid.")
        #     variant = None

        # # Get or create cart
        # cart, _ = Cart.objects.get_or_create(customer__email=customer)

        # # Get or create cart item
        # cart_item, created = CartItem.objects.get_or_create(
        #     cart=cart,
        #     product=product,
        #     variant=variant,
        #     defaults={'quantity': quantity, 'price': variant.price if variant else product.price}
        # )

        # if not created:
        #     cart_item.quantity += quantity
        #     cart_item.save()

        # return cart




class CartItemInputSerializer(serializers.Serializer):
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
        # Retrieve or create cart
        
        cart, _ = Cart.objects.get_or_create(customer=validated_data['user'])
        
        # Add item to the cart
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=validated_data['product_obj'],
            variant=validated_data['variant_obj'],
            defaults={'quantity': validated_data['quantity'],'price': validated_data['variant_obj'].sale_price if validated_data['variant_obj'] else validated_data['product_obj'].price}
        )
        if not created:
            cart_item.quantity += validated_data['quantity']
            cart_item.save()

        cart = Cart.objects.get(customer=validated_data['user'])
        return  cart      
