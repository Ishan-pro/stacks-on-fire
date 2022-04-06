from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAuthorOrNoCreation(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return request.user.is_authenticated
        else:
            return True
    
    def has_object_permission(self, request, view, obj):
        if request.method == "PUT" or request.method == "DELETE" or request.method == 'PATCH':
            if request.user == obj.author:
                return True
            else:
                return False
        else:
            return True


class IsUserOrNoDelete(BasePermission):
    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS or request.method == "POST":
            return True
        else:
            return (obj == request.user)