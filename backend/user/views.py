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

class AddressView(APIView):
    def get(self, request, email):
        # print(f"Request Data:{email}")
        user = User.object.get(email=email)
        print(user)
        if user:
            # default_address = user.filter()
            # shipping_address = AddressBook.objects.filter(user=user,is_shipping=True).first()
            # billing_address = AddressBook.objects.filter(user=user,is_billing=True).first()
            # serialize_shipping_address = AddressBookSerializer(shipping_address).data 
            # serialize_billing_address = AddressBookSerializer(billing_address).data 
            user_addresses = AddressBook.objects.filter(user=user)
            # print(f'USer adresses {user_addresses}')
            serializer_address =  AddressBookSerializer(user_addresses, many=True).data
            # print(serializer_address)
            # return Response({'shipping':serialize_shipping_address, 'billing':serialize_billing_address}, status=status.HTTP_200_OK)
            return Response(serializer_address, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    def post(self, request, email):
        try:
            user = User.object.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        data['user'] = user.id 
        # request.data.
        if user:
            serializer = AddressBookSerializer(data=data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)