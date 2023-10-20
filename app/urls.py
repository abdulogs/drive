from django.urls import path, include
from app import views

# Api
urlpatterns = [
    path("api/", include("app.api.urls")),
]

urlpatterns += [
    path("notes/", views.notes, name="notes"),
    path("settings/", views.settings, name="settings"),
]
