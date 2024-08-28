from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import *


# Create your views here.


# class LoginView(APIView):
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             print(serializer.data)
#             email = serializer.email
#             password = serializer.password 

#             print(f'email: {email} and password: {password}')
        
#         # user  = Authenticate(email=email , password=password)
#         # if user:
#         #     login(request, user)
#             return Response({'message':'Logged in sucessfully' }, status=status.HTTP_200_OK) 
#         return Response({'message':'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST ) 


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

