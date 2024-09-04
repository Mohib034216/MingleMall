from rest_framework import  serializers
from .models import * 


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields =  ['rating']

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
  attribute = AttributesSerializer()
  class Meta:
        model = AttributeValues
        fields =  ['id','value','thumnail','attribute']

class VariantSerializer(serializers.ModelSerializer):
    # attribute_values = serializers.SerializerMethodField()
    attribute_values = AttributeValuesSerializer(many=True)

    class Meta:
        model = Variants
        # fields = ['attributes']
        fields = "__all__"

    # def get_attribute_values(self, obj):
    #     attribute_values = obj.productattributedetail_set.all()
    #     # return [attribute_values]
    #     return [{'id': av.attribute.id, 'title': av.attribute.title, 'attribute': av.attribute.attribute.title,} for av in attribute_values]

class ProductSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True,source="variations")
    review = ProductReviewSerializer(source="productview")
    # category = serializers.StringRelatedField()
    # thumbnail = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'category', 'thumbnail', 'description', 'price', 'slug', 'created_at', 'updated_at', 'variants','review']



# class ProductAttributeDetailSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = ProductAttributeDetail
#         fields =  "__all__"

class ProductGallerySerializer(serializers.ModelSerializer):

   class Meta:
        model = ProductGallery
        fields =  "__all__"
