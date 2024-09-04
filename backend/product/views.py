from django.shortcuts import render
from rest_framework import viewsets
from .models import Category, Product, Attributes, AttributeValues, Variants, ProductGallery
from .serializers import (CategorySerializer, ProductSerializer, 
                          AttributesSerializer, AttributeValuesSerializer, 
                          VariantSerializer, ProductGallerySerializer)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class AttributesViewSet(viewsets.ModelViewSet):
    queryset = Attributes.objects.all()
    serializer_class = AttributesSerializer

class AttributeValuesViewSet(viewsets.ModelViewSet):
    queryset = AttributeValues.objects.all()
    serializer_class = AttributeValuesSerializer

class VariantsViewSet(viewsets.ModelViewSet):
    queryset = Variants.objects.all()
    serializer_class = VariantSerializer

# class ProductAttributeDetailViewSet(viewsets.ModelViewSet):
#     queryset = ProductAttributeDetail.objects.all()
#     serializer_class = ProductAttributeDetailSerializer

class ProductGalleryViewSet(viewsets.ModelViewSet):
    queryset = ProductGallery.objects.all()
    serializer_class = ProductGallerySerializer
