from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from .views import (CategoryViewSet, ProductViewSet, AttributesViewSet, 
#                     AttributeValuesViewSet, VariantsViewSet,
#                      ProductGalleryViewSet)
from .views import *

router = DefaultRouter()
router.register(r'', CartViewSet, basename='cart')  # Specify basename
# router.register(r'my-cart', CartViewSet.as_view({'get',"my-cart"}), basename='cart')  # Specify basename

urlpatterns = [

    # path('<str:email>/',Set.as_view()),
    # path('<str:email>/', CartViewSet.as_view()),

    path('email/<str:email>/', CartViewSet.as_view({'get': 'retrieve_cart'}), name='retrieve-cart'),
    path('add/', CartViewSet.as_view({'post': 'add_to_cart'}), name='add-to-cart'),
    path('item/delete/', CartViewSet.as_view({'delete': 'remove_item_cart'}), name='remove-to-cart'),
    path('item/update/<str:email>/', CartViewSet.as_view({'put': 'update_to_cart'}), name='update-to-cart'),
]

urlpatterns += router.urls