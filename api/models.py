
from django.db import models

class Farmer(models.Model):
    name = models.CharField(max_length=100)
    village = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    land_area = models.DecimalField(max_digits=10, decimal_places=2)
    date_registered = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Land(models.Model):
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE, related_name='lands')
    location = models.CharField(max_length=200)
    area = models.DecimalField(max_digits=10, decimal_places=2)
    soil_type = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.location} - {self.farmer.name}"

class Scheme(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    eligibility = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    
    def __str__(self):
        return self.name

class SchemeApplication(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    farmer = models.ForeignKey(Farmer, on_delete=models.CASCADE)
    scheme = models.ForeignKey(Scheme, on_delete=models.CASCADE)
    application_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    def __str__(self):
        return f"{self.farmer.name} - {self.scheme.name}"

class Feature(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon_name = models.CharField(max_length=50)  # Store icon name from Lucide
    icon_color = models.CharField(max_length=20)
    
    def __str__(self):
        return self.title
