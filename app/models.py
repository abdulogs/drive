from django.db import models
from account.models import User


class Note(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True,  blank=True)
    created_by = models.ForeignKey(
        User, null=True,  blank=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "notes"
        verbose_name = "Note"
        verbose_name_plural = "Notes"


class Setting(models.Model):
    is_approved = models.BooleanField(null=True, blank=True, default=True)
    request_email = models.TextField(null=True, blank=True)
    request_subject = models.TextField(null=True, blank=True)
    request_message = models.TextField(null=True, blank=True)
    approval_email = models.TextField(null=True, blank=True)
    approval_subject = models.TextField(null=True, blank=True)
    approval_message = models.TextField(null=True, blank=True)
    remainder_email = models.TextField(null=True, blank=True)
    remainder_subject = models.TextField(null=True, blank=True)
    remainder_message = models.TextField(null=True, blank=True)

    class Meta:
        db_table = "settings"
        verbose_name = "Setting"
        verbose_name_plural = "Settings"
