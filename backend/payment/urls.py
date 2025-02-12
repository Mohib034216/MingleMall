from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from .views import (CategoryViewSet, ProductViewSet, AttributesViewSet, 
#                     AttributeValuesViewSet, VariantsViewSet,
#                      ProductGalleryViewSet)
from .views import *

# router = DefaultRouter()
# router.register(r'order_place/', OrderPlaceAPIView.as_view())
# router.register(r'categories', CategoryViewSet)
# router.register(r'attributes', AttributesViewSet)
# router.register(r'attribute-values', AttributeValuesViewSet)
# router.register(r'variants', VariantsViewSet)
# router.register(r'product-review',ProductReviewViewSet)
# router.register(r'product-gallery', ProductGalleryViewSet)

urlpatterns = [
    # path('place-order/', OrderPlaceAPIView.as_view(), name='place-order'),
]
