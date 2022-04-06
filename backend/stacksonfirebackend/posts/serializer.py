from .models import Post
from rest_framework import serializers
from api.userSerializer import UserSerializer

class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author')

    class Meta:
        model = Post
        fields = ['id', 'text', 'author_name']