from rest_framework import  serializers
from .models import * 



class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields =  ['rating']

class VariantsSerializer(serializers.ModelSerializer):
   reviews   = ProductReviewSerializer(many=True, read_only=True)
   class Meta:
        model = Variants
        fields =  "__all__"


class CategorySerializer(serializers.ModelSerializer):
   class Meta:
        model = Category
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    category  = CategorySerializer()
    variants  = VariantsSerializer(many=True, read_only=True)
    review    = ProductReviewSerializer(many=True, read_only=True, source='productview')
    class Meta:
        model = Product
        fields =  ['id','title','thumbnail','description','price','variants','category','review']


class AttributesSerializer(serializers.ModelSerializer):
  class Meta:
        model = Attributes
        fields =  "__all__"

class AttributeValuesSerializer(serializers.ModelSerializer):
  class Meta:
        model = AttributeValues
        fields =  "__all__"


class ProductAttributeDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProductAttributeDetail
        fields =  "__all__"

class ProductGallerySerializer(serializers.ModelSerializer):

   class Meta:
        model = ProductGallery
        fields =  "__all__"
