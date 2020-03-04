from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import jwt
from .serializers import UserSerializer, NestedUserSerializer


User = get_user_model()
class RegisterView(APIView):
    def post(self, request):
        serialized_user = UserSerializer(data=request.data)
        if serialized_user.is_valid():
            serialized_user.save()
            return Response({'message': 'Registration Succesful'})
        print(serialized_user.errors)
        return Response(serialized_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
class Login(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.get(email=email)
            if not user.check_password(password):
                raise PermissionDenied({'message': 'Invalid Credentials'})
            dt = datetime.now() + timedelta(days=7)
            token = jwt.encode({'sub': user.id, 'exp': int(dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')
            return Response({'token': token, 'message': f'Welcome back {user.username}'})
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Credentials'})

class UserDetailView(APIView):

  permission_classes = (IsAuthenticated, )

  def get(self, _request, pk):

    try:
      user = User.objects.get(pk=pk)
      serialized_user = NestedUserSerializer(user)
      return Response(serialized_user.data)
    except User.DoesNotExist:
      return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

class UserEditView(APIView):

  permission_classes = (IsAuthenticated, )

  def put(self, request, pk):
    user = User.objects.get(pk=pk)
    try:
      if user.id != request.user.id:
          return Response(status=HTTP_401_UNAUTHORIZED)
      updated_user = UserSerializer(user, data=request.data)
      if updated_user.is_valid():
        updated_user.save()
        return Response(updated_user.data, status=HTTP_202_ACCEPTED)
      return Response(updated_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
    except User.DoesNotExist:
      return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

  def delete(self, request, pk):
    user = User.objects.get(pk=pk)
    try:
      if user.id != request.user.id:
          return Response(status=HTTP_401_UNAUTHORIZED)
      user.delete()
      return Response(status=HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
      return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)
