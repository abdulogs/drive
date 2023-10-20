from django.db import models
from smartfields import fields
from account.models import User


class Files(models.Model):
    name = models.CharField(max_length=100, unique=True)
    file = fields.FileField(
        upload_to="drive", null=True, blank=True, default="placeholder.png")
    is_active = models.BooleanField(null=True, blank=True, default=True)
    created_by = models.ForeignKey(
        User, null=True,  blank=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "drive"
        verbose_name = "Drive"
        verbose_name_plural = "Drive"


class Request(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    email = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    province = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    postal_code = models.CharField(max_length=100, null=True, blank=True)
    company = models.CharField(max_length=100, null=True, blank=True)
    subject = models.CharField(max_length=100, null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    files = models.TextField(null=True, blank=True)
    is_not_us_citizen = models.BooleanField(
        null=True, blank=True, default=True)
    is_agreed = models.BooleanField(null=True, blank=True, default=True)
    is_approved = models.BooleanField(null=True, blank=True, default=True)
    is_email_sent = models.BooleanField(null=True, blank=True, default=False)
    is_active = models.BooleanField(null=True, blank=True, default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "request"
        verbose_name = "Request"
        verbose_name_plural = "Requests"


class FileAccess(models.Model):
    file = models.CharField(max_length=100, null=True, blank=True)
    request = models.ForeignKey(
        Request, null=True,  blank=True, on_delete=models.CASCADE)
    is_downloaded = models.BooleanField(null=True, blank=True, default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.file

    class Meta:
        db_table = "file_access"
        verbose_name = "Access"
        verbose_name_plural = "Access"


class OTP(models.Model):
    email = models.CharField(max_length=100, null=True, blank=True)
    code = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code

    class Meta:
        db_table = "otp_verification"
        verbose_name = "Otp verification"
        verbose_name_plural = "Otp verifications"
