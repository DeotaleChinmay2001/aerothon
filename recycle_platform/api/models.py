from django.db import models

class UserDetails(models.Model):
    company_type = models.CharField(max_length=50)
    company_name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.company_type} - {self.company_name}"


class AircraftPartData(models.Model):
    part_name = models.CharField(max_length=100)
    material_composition = models.CharField(max_length=100)
    age = models.IntegerField()
    condition = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    aircraft_model = models.CharField(max_length=100)
    potential_use_cases = models.CharField(max_length=100)
    new_parts_carbon_footprint = models.FloatField()
    recycled_parts_carbon_footprint = models.FloatField()
    water_usage_new_parts = models.FloatField()
    water_usage_recycled_parts = models.FloatField()
    landfill_waste_new_parts = models.FloatField()
    landfill_waste_recycled_parts = models.FloatField()
    energy_consumption_new_parts = models.FloatField()
    energy_consumption_recycled_parts = models.FloatField()
    recycling_rate = models.FloatField()
    toxicity_score_new_parts = models.FloatField()
    toxicity_score_recycled_parts = models.FloatField()
    remanufacturing_potential = models.FloatField()
    life_cycle_assessment = models.FloatField()
    renewable_material_content = models.FloatField()
    carbon_footprint_saved = models.FloatField()
    water_usage_saved = models.FloatField()
    landfill_waste_saved = models.FloatField()
    energy_consumption_saved = models.FloatField()
    toxicity_score_difference = models.FloatField()
    remanufacturing_potential_percent = models.FloatField(default= 1.0)
    life_cycle_assessment_score = models.FloatField()
    status = models.CharField(max_length=100, default='InUse')

    def __str__(self):
        return f"{self.part_name} - {self.status}"