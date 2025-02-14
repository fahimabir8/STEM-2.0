from rest_framework import serializers
from .models import Registration

class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    segment = serializers.CharField()
    team_name = serializers.CharField(required=False, allow_blank=True)
    team_size = serializers.IntegerField()
    team_leader_name = serializers.CharField()
    team_leader_phone = serializers.CharField()
    team_leader_email = serializers.EmailField()
    transaction_id = serializers.CharField()
    team_members = serializers.ListField(child=serializers.DictField(), required=False)

    def create(self, validated_data):
        # Save to Django database
        return Registration.objects.create(**validated_data)