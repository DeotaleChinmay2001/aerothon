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
            print("RecyclerDataView token: " + str(token))
            payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
            print("RecyclerDataView payload: " + str(payload))

            user = UserDetails.objects.get(pk=payload.get('user_id'))
            print("RecyclerDataView user: " + str(user))
            
            company_name = user.company_name.replace(" ", "")
            company_type = user.company_type.replace(" ", "")

            if company_type != "Recycler" :
                return Response({'error': 'Access Denied!!' }, status=status.HTTP_400_BAD_REQUEST)
            
            print("RecyclerDataView End: " + str(company_name))
            serialized = AircraftPartDataSerializer(AircraftPartData.objects.all().order_by('remanufacturing_potential_percent')[:200], many=True)
            print("RecyclerDataView End: " + str(serialized.data))
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
            company_name = user.company_name.replace(" ", "")
            company_type = user.company_type.replace(" ", "")
            
            if company_type != "Recycler" :
                return Response({'error': 'Access Denied!!' }, status=status.HTTP_400_BAD_REQUEST)
        
            part_id = request.data.get('id')
            status_type = request.data.get('status_type')
            try:
                part = AircraftPartData.objects.filter(pk=part_id, status="Recycling")
                if status_type in ['Removed']:
                    part.status = status_type
                serialized = AircraftPartDataSerializer(data = part, many=True)
                if serialized.is_valid() : 
                    serialized.save()
                    print("Status Has been changed")
                resp = AircraftPartDataSerializer(AircraftPartData.objects.filter(status='Recycling'), many=True)
                return Response(resp.data, status= status.HTTP_200_OK)
            except :
                return Response({'message': 'Part not found or is not in use.'}, status=status.HTTP_404_NOT_FOUND)
        
        except jwt.ExpiredSignatureError as e :
            return Response({'error': 'Activations link expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as e :
            return Response({'error': 'Invalid Token'}, status=status.HTTP_400_BAD_REQUEST)
        

class PartDataView(APIView):
    def post(self, request):
        token = request.headers.get('token')
        try :
            print("PartDataView token: " + str(token))
            payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
            user = UserDetails.objects.get(pk=payload.get('user_id'))
            company_name = user.company_name.replace(" ", "")
            company_type = user.company_type.replace(" ", "")

            if company_type not in ["Airline", "Manufacturer"] :
                return Response({'error': 'Access Denied!!' }, status=status.HTTP_400_BAD_REQUEST)
        
            part_id = request.data.get('id')
            status_type = request.data.get('status_type') # 'recycling' or 'repurposing'
            try:
                part = AircraftPartData.objects.get(pk=part_id, status="InUse")
                if status_type =='Recycling':
                    part.status = status_type
                serialized = AircraftPartDataSerializer(data = part, many = True)
                if serialized.is_valid() : 
                    serialized.save()
                    print("Status Has been changed")
                if company_type == "Manufacturer" :
                    resp = AircraftPartDataSerializer(AircraftPartData.objects.filter( status = "InUse", manufacturer=company_name), many = True)
                    return Response(resp.data, status= status.HTTP_200_OK)
                else : 
                    resp = AircraftPartDataSerializer(AircraftPartData.objects.filter( status = "InUse"), many = True)
                    return Response(resp.data, status= status.HTTP_200_OK)
            
            except :
                return Response({'message': 'Part not found or is not in use.'}, status=status.HTTP_404_NOT_FOUND)

        except jwt.ExpiredSignatureError as e :
            return Response({'error': 'Activations link expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as e :
            return Response({'error': 'Invalid Token'}, status=status.HTTP_400_BAD_REQUEST)
        except :
            return Response({'error': 'Something Went Wrong!!'}, status=status.HTTP_400_BAD_REQUEST)
        

        
    def get(self, request):
        token = request.headers.get('token')
        try :
            print("PartDataView get token: " + str(token))
            payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
            print("PartDataView get payload: " + str(payload))

            user = UserDetails.objects.get(pk=payload.get('user_id'))
            company_name = user.company_name.replace(" ", "")
            company_type = user.company_type.replace(" ", "")
            print("PartDataView get user: " + str(user))
            
            if company_type == "Recycler" :
                return Response({'error': 'Access Denied!!' }, status=status.HTTP_400_BAD_REQUEST)
        
            if company_type == "Manufacturer" :
                aircraftPartDatas = AircraftPartData.objects.filter(status="InUse", manufacturer=company_name)
                serialized = AircraftPartDataSerializer(aircraftPartDatas, many=True)
                return Response(serialized.data, status= status.HTTP_200_OK)
            else : 
                aircraftPartDatas = AircraftPartData.objects.filter(status="InUse")
                serialized = AircraftPartDataSerializer(aircraftPartDatas, many=True)
                print("PartDataView get resp 2: " + str(serialized.data))
                return Response(serialized.data, status= status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as e :
            return Response({'error': 'Activations link expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as e :
            return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
        