import os
from django.shortcuts import render
from account.decorators import login_required
from .models import FileAccess
from django.conf import settings
from django.http import HttpResponse
from wsgiref.util import FileWrapper
from django.conf import settings


@login_required(login_url="/")
def files(request):
    return render(request, "files.html")


def requestAccess(request):
    return render(request, "request.html")

def thankyou(request):
    return render(request, "thank-you.html")


def fileAccess(request, filename):
    try:
        getFile = FileAccess.objects.get(file=filename)
        getFile.is_downloaded = True
        getFile.save()
        file = "pdf\\" + filename + ".pdf"
        file_path = os.path.join(settings.MEDIA_ROOT, file)

        if os.path.exists(file_path):
            with open(file_path, 'rb') as file_content:
                response = HttpResponse(FileWrapper(
                    file_content), content_type='application/pdf')
                response['Content-Disposition'] = f'attachment; filename="{filename}.pdf"'
                return response
        else:
            # Handle the case where the file does not exist
            # You might want to return an error response or redirect to an error page.
            pass
    except Exception as e:
        pass
