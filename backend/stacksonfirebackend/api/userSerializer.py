from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    posts = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field="text"
    )

    class Meta:
        model = User
        fields = ['username', "first_name", "last_name", "email", "id", "posts"]