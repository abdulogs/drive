from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (ProfileApi, LoginApi, RegistrationApi,
                    ChangePasswordApi, PasswordResetApi, PasswordResetEmailApi)

router = DefaultRouter()

router.register("user", ProfileApi)

urlpatterns = [
    path("", include(router.urls)),
    path("login/", LoginApi.as_view()),
    path("register/", RegistrationApi.as_view()),
    path("change-password/", ChangePasswordApi.as_view()),
    path("send-reset-email/", PasswordResetEmailApi.as_view()),
    path("reset-password/<uid>/<token>/", PasswordResetApi.as_view()),
]
