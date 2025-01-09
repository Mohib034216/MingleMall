from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from .views import (CategoryViewSet, ProductViewSet, AttributesViewSet, 
#                     AttributeValuesViewSet, VariantsViewSet,
#                      ProductGalleryViewSet)
from .views import *
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

router = DefaultRouter()
# router.register(r'', ProductViewSet, basename='product')
router.register(r'', ProductViewSet, basename='products')
router.register(r'/variants/<pk>', VariantsViewSet, basename='product-variants')



router.register(r'', ProductViewSet)    
# router.register(r'/<str:sku>/', ProductOrVariantView.as_view())
router.register(r'categories', CategoryViewSet)
router.register(r'attributes', AttributesViewSet)
router.register(r'attribute-values', AttributeValuesViewSet)
router.register(r'variants', VariantsViewSet)
router.register(r'product-review',ProductReviewViewSet)
router.register(r'product-gallery', ProductGalleryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


# urlpatterns = [
#     path('products/<str:sku>/', ProductViewSet.as_view({'get': 'retrieve'})),
# ]

# urlpatterns = format_suffix_patterns(urlpatterns)