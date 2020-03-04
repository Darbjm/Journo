from django.urls import path
from .views import TripListView, TripDetailView, MakeTripView, ImportEditTripListView

urlpatterns = [
    path('', TripListView.as_view()),
    path('make', MakeTripView.as_view()),
    path('<int:pk>/', TripDetailView.as_view()),
    path('edit/<int:pk>/', ImportEditTripListView.as_view())
]