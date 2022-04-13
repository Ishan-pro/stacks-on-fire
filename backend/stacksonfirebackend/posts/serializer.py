from .models import Post
from rest_framework import serializers
from api.userSerializer import UserSerializer

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id', 'text', ]