from ntpath import join
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Post(models.Model):
    
    text=models.TextField()
    author=models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    created_at=models.DateTimeField(default=timezone.now)

    def __str__(self):
        space = ' '
        return f"""{self.author.username}'s {space.join(self.text.split(' ')[:5])}  post"""

class Tag(models.Model):
    name=models.CharField(max_length=100)
    shortForm = models.CharField(max_length=10)