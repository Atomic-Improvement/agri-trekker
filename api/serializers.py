
from rest_framework import serializers
from .models import Farmer, Land, Scheme, SchemeApplication, Feature

class LandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Land
        fields = ['id', 'location', 'area', 'soil_type']

class FarmerSerializer(serializers.ModelSerializer):
    lands = LandSerializer(many=True, read_only=True)
    
    class Meta:
        model = Farmer
        fields = ['id', 'name', 'village', 'phone', 'land_area', 'date_registered', 'lands']

class SchemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scheme
        fields = ['id', 'name', 'description', 'eligibility', 'start_date', 'end_date']

class SchemeApplicationSerializer(serializers.ModelSerializer):
    farmer_name = serializers.ReadOnlyField(source='farmer.name')
    scheme_name = serializers.ReadOnlyField(source='scheme.name')
    
    class Meta:
        model = SchemeApplication
        fields = ['id', 'farmer', 'scheme', 'farmer_name', 'scheme_name', 'application_date', 'status']

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ['id', 'title', 'description', 'icon_name', 'icon_color']
