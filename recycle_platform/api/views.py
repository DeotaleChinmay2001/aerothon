from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from .models import UserDetails
from django.conf import settings
import jwt
from django.contrib.auth.hashers import make_password

class LoginAPIView(APIView):
    def post(self, request):    
        company_role = request.data.get('companyrole')
        company_name = request.data.get('companyname')
        password = request.data.get('password')

        # Query the UserDetails model to get the user with the given credentials
        user_details = UserDetails.objects.filter(company_type=company_role, company_name=company_name, password=password).first()
        print(user_details)
        if not user_details:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # If the user credentials are valid, generate a token and return it as a response
        token = jwt.encode({'user_id': user_details.pk}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token}, status=status.HTTP_200_OK)



class HelloWorld(APIView):
    def get(self, request):
        return Response({'message': 'Hello, World!'})