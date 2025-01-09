from django.urls import path, include
from user.views import *


urlpatterns = [
    path('login/',LoginView.as_view(), name="login" ),
    path('register/',RegisterView.as_view(), name="register" ),
    path('addressbook/<str:email>',AddressView.as_view(), name="addressbook" ),
  
]
