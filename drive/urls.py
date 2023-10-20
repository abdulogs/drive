from django.urls import path, include
from drive import views

# Api urls
urlpatterns = [
    path("api/", include("drive.api.urls")),
]

#  Urls
urlpatterns += [
    path("files/", views.files, name="files"),
    path("request/", views.requestAccess, name="requestAccess"),
    path("thank-you/", views.thankyou, name="thankyou"),
    path("file/<str:filename>/", views.fileAccess, name="fileAccess"),
]
