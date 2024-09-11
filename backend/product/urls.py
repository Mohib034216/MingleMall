from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from .views import (CategoryViewSet, ProductViewSet, AttributesViewSet, 
#                     AttributeValuesViewSet, VariantsViewSet,
#                      ProductGalleryViewSet)
from .views import *
from rest_framework import routers

class CustomRouter(routers.DefaultRouter):
    def get_urlpatterns(self):
        urlpatterns = []
        for viewset, prefix in self.registry:
            lookup_url = r'^{prefix}/{sku}/$'.format(prefix=prefix)
            urlpatterns.append(routers.Route(lookup_url, viewset.as_view({'get': 'retrieve'})))
        return urlpatterns



router = CustomRouter()
# router = DefaultRouter()
router.register(r'', ProductViewSet, basename='product')
# router.register(r'', ProductViewSet)    
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
