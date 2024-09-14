from rest_framework import  serializers
from .models import * 


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields =  "__all__"

# class ProductAttributeDetailSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = ProductAttributeDetail
#         fields =  "__all__"


class CategorySerializer(serializers.ModelSerializer):
    
   class Meta:
        model = Category
        fields = "__all__"
        

class AttributesSerializer(serializers.ModelSerializer):
  class Meta:
        model = Attributes
        fields =  ["title"]

class AttributeValuesSerializer(serializers.ModelSerializer):
    attribute_title = serializers.CharField(source='attribute.title')

    class Meta:
        model = AttributeValues
        fields = ['id', 'value', 'attribute_title']

class VariantSerializer(serializers.ModelSerializer):
    attribute_values = AttributeValuesSerializer(many=True)
    # Product = ProductSerializer(many=True,soruce="variations")

    class Meta:
        model = Variants
        fields = ['attribute_values']
        fields = "__all__"


   
    
class ProductSerializer(serializers.ModelSerializer):
    review = ProductReviewSerializer(many=True,source="productreview")
    variants = VariantSerializer(many=True,source="variations")
    # category = serializers.StringRelatedField()
    # thumbnail = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'category', 'thumbnail', 'description', 'price', 'sku', 'stock_status', 'slug', 'created_at', 'updated_at', 'variants','review']
        # fields = ['variants','review']
        # fields = "__all__"

# class ProductAttributeDetailSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = ProductAttributeDetail
#         fields =  "__all__"

class ProductGallerySerializer(serializers.ModelSerializer):

   class Meta:
        model = ProductGallery
        fields =  "__all__"
