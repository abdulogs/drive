from django.shortcuts import render
from account.decorators import login_required


@login_required(login_url="/")
def notes(request):
    return render(request, "notes.html")

@login_required(login_url="/")
def settings(request):
    return render(request, "settings.html")


def d_not_found(request):
    return render(request, "404.html")


def handler404(request, *args, **argv):
    response = render(request, "404.html")
    response.status_code = 404
    return response


def handler500(request, *args, **argv):
    response = render(request, "500.html")
    response.status_code = 500
    return response
