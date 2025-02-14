from django.db import models

class Registration(models.Model):
    email = models.EmailField( max_length=200, null=True, blank=True)
    segment = models.CharField(max_length=100)
    team_name = models.CharField(max_length=100, blank=True, null=True)
    team_size = models.IntegerField()
    team_leader_name = models.CharField(max_length=100)
    team_leader_phone = models.CharField(max_length=20)
    team_leader_email = models.EmailField(null=True, blank=True)
    transaction_id = models.CharField(max_length=100)
    team_members = models.JSONField(default=list)  # Store team members as JSON

    def __str__(self):
        return self.email