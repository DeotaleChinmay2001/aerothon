from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from .models import UserDetails, AircraftPartData
from django.conf import settings
import jwt
from django.contrib.auth.hashers import make_password
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from .serializers import UserDetailsSerializer, AircraftPartDataSerializer


class LoginAPIView(APIView):
    def post(self, request):    
        company_role = request.data.get('companyrole')
        company_name = request.data.get('companyname')
        password = request.data.get('password')
        print('data : ' + str(request))

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
    

class RecyclerDataView(APIView):
    def get(self, request):
        token = request.headers.get('token')
        try :
            payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])

            user = UserDetails.objects.get(pk=payload.get('user_id'))
            company_name = user.company_name
            
            if company_name != "Recycler" :
                return Response({'error': 'Access Denied!!' }, status=status.HTTP_400_BAD_REQUEST)
        
            aircraftPartDatas = AircraftPartData.objects.filter(status = "Recycling")
            serialized = AircraftPartDataSerializer(aircraftPartDatas, many=True)
            return Response(serialized.data, status= status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as e :
            return Response({'error': 'Activations link expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as e :
            return Response({'error': 'Invalid Token'}, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request):
        token = request.headers.get('token')
        try :
            payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])

            user = UserDetails.objects.get(pk=payload.get('user_id'))
            company_name = user.company_name
            
            if company_name != "Recycler" :
                return Response({'error': 'Access Denied!!' }, status=status.HTTP_400_BAD_REQUEST)
        
            part_id = request.data.get('id')
            status_type = request.data.get('status_type') # 'recycling' or 'repurposing'
            try:
                part = AircraftPartData.objects.get(pk=part_id, status='Recycling')
            except :
                return Response({'message': 'Part not found or is not in use.'}, status=status.HTTP_404_NOT_FOUND)

            # Update the status of the selected part
            if status_type in ['Removed']:
                part.status = status_type
            part.save()
            serialized = AircraftPartDataSerializer(part)
            return Response(serialized.data, status= status.HTTP_200_OK)
        
        except jwt.ExpiredSignatureError as e :
            return Response({'error': 'Activations link expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as e :
            return Response({'error': 'Invalid Token'}, status=status.HTTP_400_BAD_REQUEST)
        

class PartDataView(APIView):
    def post(self, request):
        token = request.headers.get('token')
        try :
            payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
            user = UserDetails.objects.get(pk=payload.get('user_id'))
            company_name = user.company_name

            if company_name not in ["Airline", "manufacturer"] :
                return Response({'error': 'Access Denied!!' }, status=status.HTTP_400_BAD_REQUEST)
        
            part_id = request.data.get('id')
            status_type = request.data.get('status_type') # 'recycling' or 'repurposing'
            print("part: " + str(status_type))
            try:
                part = AircraftPartData.objects.get(pk=part_id, status='Recycling')
            except :
                return Response({'message': 'Part not found or is not in use.'}, status=status.HTTP_404_NOT_FOUND)

            # Update the status of the selected part
            if status_type in ['recycling', 'Repurposing']:
                part.status = status_type
            part.save()
            serialized = AircraftPartDataSerializer(part)
            return Response(serialized.data, status= status.HTTP_200_OK)

        except jwt.ExpiredSignatureError as e :
            return Response({'error': 'Activations link expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as e :
            return Response({'error': 'Invalid Token'}, status=status.HTTP_400_BAD_REQUEST)
        except :
            return Response({'error': 'Something Went Wrong!!'}, status=status.HTTP_400_BAD_REQUEST)
        

        
    def get(self, request):
        token = request.headers.get('token')
        try :
            payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])

            user = UserDetails.objects.get(pk=payload.get('user_id'))
            company_name = user.company_name
            
            if company_name == "Recycler" :
                return Response({'error': 'Access Denied!!' }, status=status.HTTP_400_BAD_REQUEST)
        
            aircraftPartDatas = AircraftPartData.objects.all()
            serialized = AircraftPartDataSerializer(aircraftPartDatas, many=True)
            return Response(serialized.data, status= status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as e :
            return Response({'error': 'Activations link expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as e :
            return Response({'error': 'Invalid Token'}, status=status.HTTP_400_BAD_REQUEST)
        