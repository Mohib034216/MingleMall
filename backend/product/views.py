from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Category, Product, Attributes, AttributeValues, Variants, ProductGallery
# from .serializers import (CategorySerializer, ProductSerializer, 
#                           AttributesSerializer, AttributeValuesSerializer, 
#                           VariantSerializer, ProductGallerySerializer)
from .serializers import *

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

    @action(detail=True, methods=['get'])
    def attributes(self, request, pk=None):
        variant = self.get_object()
        attributes = AttributeValues.objects.filter(variants=variant)

        colors = attributes.filter(attribute__title__iexact="color")
        sizes = attributes.filter(attribute__title__iexact="size")

        color_serializer = AttributeValuesSerializer(colors, many=True)
        size_serializer = AttributeValuesSerializer(sizes, many=True)

        return Response({
            'colors': color_serializer.data,
            'sizes': size_serializer.data
        })

class ProductReviewViewSet(viewsets.ModelViewSet):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer

class ProductGalleryViewSet(viewsets.ModelViewSet):
    queryset = ProductGallery.objects.all()
    serializer_class = ProductGallerySerializer
