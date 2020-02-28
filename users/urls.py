from django.urls import path
from .views import RegisterView, Login, UserDetailView, UserEditView

urlpatterns = [
  path('register', RegisterView.as_view()),
  path('login', Login.as_view()),
  path('show/<int:pk>/', UserDetailView.as_view()),
  path('edit/<int:pk>/', UserEditView.as_view())
]