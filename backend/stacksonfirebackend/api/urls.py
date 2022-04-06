from api.views import PostViewset, UserViewSet
from rest_framework import routers

router = routers.SimpleRouter()

router.register('posts', PostViewset)
router.register('user', UserViewSet)
urlpatterns = router.urls