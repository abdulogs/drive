from .models import Request
from datetime import datetime, timedelta
from django.utils import timezone
from app.helpers import exact_url
from email_utils import send_email


def remainder(request):
    now = timezone.now()
    ago = now - timedelta(days=0)
    date = ago.date()
    settings = request.setting
    requests = Request.objects.filter(
        is_approved=True, created_at__date=date,  is_email_sent=False)
    for item in requests:

        send_email(
            context={
                "url": exact_url(request),
                "fullname": item.name,
                "message": settings.request_message,
            },
            from_email=settings.remainder_email,
            recipient_list=[item.email],
            subject=settings.remainder_subject,
            template_name="email_templates/remainder.html",
        )
        item.is_email_sent = True
        item.save()
    return {"remainder": None}
