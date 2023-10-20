from django.shortcuts import render, HttpResponseRedirect
from account.decorators import login_required, logout_required, logout


def index(request):
    if request.user.is_authenticated:
        return render(request, "dashboard.html")
    else:
        return render(request, "index.html")


@login_required(login_url="/")
def change_passowrd(request):
    return render(request, "change-password.html")


@logout_required(logout_url="/")
def forgot_password(request):
    return render(request, "password-forgot.html")


@logout_required(logout_url="/")
def password_reset(request, uid, token):
    return render(request, "password-reset.html", {"token": token, "uid": uid})


@login_required(login_url="/")
def team(request):
    return render(request, "team.html")


@login_required(login_url="/")
def profile(request):
    return render(request, "profile.html")


def log_out(request):
    logout(request)
    return HttpResponseRedirect("/")


def forbidden(request):
    return render(request, "403.html")
