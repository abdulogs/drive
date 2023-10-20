from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from app.helpers import pagination, authentication
from app.models import Note, Setting
from .serializers import NoteSerializer, SettingSerializer


class NoteApi(viewsets.ModelViewSet):
    queryset = Note.objects.all().select_related()
    serializer_class = NoteSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ["created_by_id"]
    search_fields = ["name", "created_by__first_name", "created_by__last_name",
                     "created_by__username"]
    ordering = ["-id"]
    pagination_class = pagination
    authentication_classes = authentication
    permission_classes = [IsAdminUser, IsAuthenticated]

    def perform_create(self, serializer):
        return serializer.save(created_by=self.request.user)


class SettingApi(viewsets.ModelViewSet):
    queryset = Setting.objects.all().select_related()
    serializer_class = SettingSerializer
    authentication_classes = authentication
    permission_classes = [IsAdminUser, IsAuthenticated]