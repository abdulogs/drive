from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NoteApi, SettingApi

router = DefaultRouter()

router.register("note", NoteApi)
router.register("setting", SettingApi)
urlpatterns = [
    path("", include(router.urls), name="app_api"),
]
