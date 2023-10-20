from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter
from app.helpers import authentication, pagination, IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from drive.models import Files, Request, OTP
from .serializers import FilesSerializer, RequestWSerializer, RequestDSerializer, OTPSerializer


class FilesApi(viewsets.ModelViewSet):
    queryset = Files.objects.all().select_related()
    serializer_class = FilesSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["id", "is_active"]
    search_fields = ["name"]
    ordering = ["-id"]
    pagination_class = pagination
    authentication_classes = authentication
    permission_classes = [IsAdminUser, IsAuthenticated]

    def perform_create(self, serializer):
        return serializer.save(created_by=self.request.user)


class RequestWApi(viewsets.ModelViewSet):
    queryset = Request.objects.all().select_related()
    serializer_class = RequestWSerializer
    http_method_names = ["post"]


class RequestDApi(viewsets.ModelViewSet):
    queryset = Request.objects.all().select_related()
    serializer_class = RequestDSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["id", "is_active"]
    search_fields = ["name"]
    ordering = ["-id"]
    pagination_class = pagination
    authentication_classes = authentication
    permission_classes = [IsAdminUser, IsAuthenticated]


class OTPApi(viewsets.ModelViewSet):
    queryset = OTP.objects.all().select_related()
    serializer_class = OTPSerializer
    http_method_names = ["post"]