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
    path("cod/<int:order_id>/", CODPaymentAPIView.as_view(), name="cod-payment"),
    
    path('paypal-payment/<int:order_id>/', PayPalPaymentView.as_view(), name='paypal-payment'),
    path('capture-paypal/<str:payment_id>/', CapturePayPalPaymentView.as_view(), name='capture-paypal'),

    path("easypaisa/<int:order_id>/", EasyPaisaPaymentAPIView.as_view(), name="easypaisa-create-payment"),
    path('easypaisa-callback/', EasyPaisaCallbackAPIView.as_view(), name='payoneer-payment'),


    # path('place-order/', OrderPlaceAPIView.as_view(), name='place-order'),
]
