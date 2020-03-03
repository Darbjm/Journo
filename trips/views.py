#pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from rest_framework.permissions import IsAuthenticated

from .models import Trip, Comment
from .serializers import TripSerializer, PopulatedTripSerializer, CommentSerializer
# Create your views here.

class TripListView(APIView):

    def get(self, request):
      trips = Trip.objects.all()
      serializer = PopulatedTripSerializer(trips, many=True)
      print(serializer)
      return Response(serializer.data)

class MakeTripView(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request):
      print(request.data)
      trip = TripSerializer(data=request.data)
      if trip.is_valid():
        trip.save()
        return Response(trip.data, status=HTTP_201_CREATED)
      return Response(trip.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class TripDetailView(APIView):

  permission_classes = (IsAuthenticated, )

  def get(self, _request, pk):

    try:
      trip = Trip.objects.get(pk=pk)
      serialized_trip = PopulatedTripSerializer(trip)
      return Response(serialized_trip.data)
    except Trip.DoesNotExist:
      return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

  def put(self, request, pk):

    try:
      trip = Trip.objects.get(pk=pk)
      updated_trip = TripSerializer(trip, data=request.data)
      if updated_trip.is_valid():
        updated_trip.save()
        return Response(updated_trip.data, status=HTTP_202_ACCEPTED)
      return Response(updated_trip.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
    except Trip.DoesNotExist:
      return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

  def delete(self, _request, pk):

    try:
      trip = Trip.objects.get(pk=pk)
      trip.delete()
      return Response(status=HTTP_204_NO_CONTENT)
    except Trip.DoesNotExist:
      return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

class CommentListView(APIView):

    permission_classes = (IsAuthenticated, )

    def post(self, request, pk):
      request.data['film'] = pk
      request.data['user'] = request.user.id

      comment = CommentSerializer(data=request.data)

      if comment.is_valid():
        comment.save()
        trip = Trip.objects.get(pk=pk)
        serialised_trip = PopulatedTripSerializer(trip)

        return Response(serialised_trip.data, status=HTTP_201_CREATED)

      return Response(comment.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class CommentDetailView(APIView):

    permission_classes = (IsAuthenticated, )
  
    def delete(self, request, **kwargs):
    
      try:
        comment = Comment.objects.get(pk=kwargs['comment_pk'])
        if comment.owner.id != request.user.id:
          return Response(status=HTTP_401_UNAUTHORIZED)
        comment.delete()
        return Response(status=HTTP_204_NO_CONTENT)
      except Comment.DoesNotExist:
        return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)