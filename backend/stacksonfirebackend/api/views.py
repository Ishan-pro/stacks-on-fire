from api.permissions import IsAuthorOrNoCreation, IsUserOrNoDelete
from api.userSerializer import UserSerializer
from posts.models import Post
from django.contrib.auth.models import User
from posts.serializer import PostSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

class PostViewset(ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at').values()
    serializer_class = PostSerializer
    permission_classes = [IsAuthorOrNoCreation]

    def create(self, request):
        user = request.user
        post = Post(text=request.data['text'], author=user)
        post.save()
        serializer = self.get_serializer(post)
        return Response(serializer.data)


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsUserOrNoDelete]

    def create(self, request, *args, **kwargs):
        username = request.data['username']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        email = request.data['email']
        password = request.data['password']

        user = User(username=username, first_name=first_name, last_name=last_name, email=email)
        user.set_password(password)
        user.save()
        serializer = self.get_serializer(user)
        return Response(serializer.data)