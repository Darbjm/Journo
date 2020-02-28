from django.urls import path
from .views import TripListView, TripDetailView, MakeTripView

urlpatterns = [
    path('', TripListView.as_view()),
    path('make', MakeTripView.as_view()),
    path('<int:pk>/', TripDetailView.as_view()),
]