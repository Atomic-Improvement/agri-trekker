
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'farmers', views.FarmerViewSet)
router.register(r'lands', views.LandViewSet)
router.register(r'schemes', views.SchemeViewSet)
router.register(r'applications', views.SchemeApplicationViewSet)
router.register(r'features', views.FeatureViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard-stats/', views.get_dashboard_stats),
    path('get-features/', views.get_features),
]
