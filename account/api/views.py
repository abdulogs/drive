from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login as login_auth
from app.helpers import pagination, authentication, get_tokens_for_user
from app.models import User
from .serializers import (ProfileSerializer, RegistrationSerializer, LoginSerializer, ChangePasswordSerializer,
                          PasswordResetEmailSerializer, PasswordResetSerializer)


class ProfileApi(viewsets.ModelViewSet):
    queryset = User.objects.all().select_related()
    serializer_class = ProfileSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["is_email_verified",  "is_active", "is_superuser",
                        "is_staff"]
    search_fields = ["username", "first_name", "last_name", "email"]
    pagination_class = pagination
    authentication_classes = authentication
    permission_classes = [IsAuthenticated]


class RegistrationApi(APIView):
    def post(self, request, format=None):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response(token, status=status.HTTP_201_CREATED)


class LoginApi(APIView):
    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get("email")
        password = serializer.data.get("password")
        user_login = authenticate(username=email, password=password)

        if user_login:
            data = get_tokens_for_user(user_login)
            login_auth(request, user_login)
            return Response(data)
        else:
            return Response(False)


class ChangePasswordApi(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = ChangePasswordSerializer(
            data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)


class PasswordResetEmailApi(APIView):
    def post(self, request, format=None):
        serializer = PasswordResetEmailSerializer(
            data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        return Response({"message": "Password Reset link send. Please check your Email"}, status=status.HTTP_200_OK)


class PasswordResetApi(APIView):
    def post(self, request, uid, token, format=None):
        serializer = PasswordResetSerializer(
            data=request.data, context={"uid": uid, "token": token})
        serializer.is_valid(raise_exception=True)
        return Response({"message": "Password Reset Successfully", "change": True}, status=status.HTTP_200_OK)
