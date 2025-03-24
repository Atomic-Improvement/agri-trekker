
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Farmer, Land, Scheme, SchemeApplication, Feature
from .serializers import (
    FarmerSerializer, LandSerializer, SchemeSerializer, 
    SchemeApplicationSerializer, FeatureSerializer
)

class FarmerViewSet(viewsets.ModelViewSet):
    queryset = Farmer.objects.all()
    serializer_class = FarmerSerializer

class LandViewSet(viewsets.ModelViewSet):
    queryset = Land.objects.all()
    serializer_class = LandSerializer

class SchemeViewSet(viewsets.ModelViewSet):
    queryset = Scheme.objects.all()
    serializer_class = SchemeSerializer

class SchemeApplicationViewSet(viewsets.ModelViewSet):
    queryset = SchemeApplication.objects.all()
    serializer_class = SchemeApplicationSerializer

class FeatureViewSet(viewsets.ModelViewSet):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer

@api_view(['GET'])
def get_dashboard_stats(request):
    """API endpoint to get statistics for the dashboard"""
    farmer_count = Farmer.objects.count()
    approved_applications = SchemeApplication.objects.filter(status='approved').count()
    pending_applications = SchemeApplication.objects.filter(status='pending').count()
    active_schemes = Scheme.objects.count()
    
    # This would be replaced with more sophisticated queries in a real app
    monthly_data = [
        {'month': 'Jan', 'registrations': 65, 'approvals': 53},
        {'month': 'Feb', 'registrations': 78, 'approvals': 60},
        {'month': 'Mar', 'registrations': 60, 'approvals': 45},
        {'month': 'Apr', 'registrations': 85, 'approvals': 70},
        {'month': 'May', 'registrations': 90, 'approvals': 75},
        {'month': 'Jun', 'registrations': 100, 'approvals': 82},
    ]
    
    return Response({
        'stats': {
            'farmer_count': farmer_count,
            'approved_applications': approved_applications,
            'pending_applications': pending_applications,
            'active_schemes': active_schemes,
        },
        'monthly_data': monthly_data
    })

@api_view(['GET'])
def get_features(request):
    """Get all features for the homepage"""
    features = Feature.objects.all()
    serializer = FeatureSerializer(features, many=True)
    return Response(serializer.data)
