from django.urls import path, include
from account import views

# Api
urlpatterns = [
    path("api/", include("account.api.urls")),
]

urlpatterns += [
    path("", views.index, name="index"),
    path("team/", views.team, name="team"),
    path("profile/", views.profile, name="profile"),
    path("change-password/", views.change_passowrd, name="change_passowrd"),
    path("logout/", views.log_out, name="logout"),
    path("password-forgot/", views.forgot_password, name="forgot_password"),
    path("password-reset/<uid>/<token>/",
         views.password_reset, name="password_reset"),
    path("forbidden/", views.forbidden, name="forbidden"),
]
