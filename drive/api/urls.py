from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FilesApi, RequestDApi, RequestWApi, OTPApi

router = DefaultRouter()

router.register("file", FilesApi)
router.register("otp", OTPApi)
router.register("w/request", RequestWApi)
router.register("d/request", RequestDApi)

urlpatterns = [
    path("", include(router.urls), name="files_api")
]
