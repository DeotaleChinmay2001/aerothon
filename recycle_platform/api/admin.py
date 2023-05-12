from django.contrib import admin
from .models import UserDetails, AircraftPartData
from import_export.admin import ImportExportModelAdmin

class AircraftPartDataAdmin (ImportExportModelAdmin, admin.ModelAdmin):
  ...

admin.site.register(AircraftPartData, AircraftPartDataAdmin)

admin.site.register(UserDetails)