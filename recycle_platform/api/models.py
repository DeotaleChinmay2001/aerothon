from django.db import models

class UserDetails(models.Model):
    company_type = models.CharField(max_length=50)
    company_name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.company_type} - {self.company_name}"
