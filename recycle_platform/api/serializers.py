from rest_framework import serializers
from .models import UserDetails, AircraftPartData



class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = "__all__"


class AircraftPartDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = AircraftPartData
        fields = "__all__"