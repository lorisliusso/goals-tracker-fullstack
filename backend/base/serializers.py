from rest_framework import serializers
from .models import Goals


class GoalsSerializer(serializers.ModelSerializer):
    class Meta:
        model= Goals
        fields= '__all__'
