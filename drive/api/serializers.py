from drf_writable_nested.serializers import WritableNestedModelSerializer
from rest_framework import serializers
from drive.models import Files, Request, FileAccess, OTP
from account.api.serializers import CreatedBySerializer
from app.helpers import exact_url
from email_utils import send_email
from drive.helpers import generate_token, modify_pdf


class FilesSerializer(WritableNestedModelSerializer):
    created_by = CreatedBySerializer(many=False, read_only=True)

    class Meta:
        model = Files
        fields = ("id", "name", "file", "is_active",
                  "created_by", "created_at", "updated_at")


class RequestWSerializer(WritableNestedModelSerializer):
    class Meta:
        model = Request
        fields = "__all__"

    def validate(self, attrs):
        request = self.context["request"]
        code = request.data.get("code")
        email = attrs.get("email")
        try:
            OTP.objects.get(code=code, email=email)
        except:
            raise serializers.ValidationError(
                "Invalid email confirmation code")

        if Request.objects.filter(email=email).first():
            raise serializers.ValidationError(
                "You are already registered in a system. Please contact to the support team")

        return attrs

    def create(self, validated_data):
        request = self.context["request"]
        settings = request.setting
        email = validated_data.get("email")

        send_email(
            context={
                "url": exact_url(request),
                "fullname": validated_data.get("name"),
                "message": settings.request_message,
            },
            from_email=email,
            recipient_list=[settings.request_email],
            subject=settings.request_subject,
            template_name="email_templates/request-approval.html",
        )

        OTP.objects.filter(email=email).delete()

        data = Request.objects.create(**validated_data)
        return data


class RequestDSerializer(WritableNestedModelSerializer):
    files = serializers.SerializerMethodField("get_files")

    def get_files(self, obj):
        try:
            return FileAccess.objects.filter(
                request_id=obj.id).select_related().distinct()
        except Exception as e:
            return None

    class Meta:
        model = Request
        fields = "__all__"


    def update(self, instance, validated_data):
        request = self.context["request"]
        fullname = instance.name
        email = instance.email
        subject = validated_data.get("subject")
        token = generate_token(email)
        files = request.data.get("files")
        url = exact_url(request)
        template = ""
        settings = request.setting

        for key in validated_data:
            setattr(instance, key, validated_data.get(key))

        instance.files = files

        try:
            for item in Files.objects.filter(id__in=files.split(',')):
                filename = str(instance.id) + token
                FileAccess.objects.create(
                    request=instance, file=filename, is_downloaded=False)
                template += f"""<li><a href="{url}/file/{filename}">{item.name}</a></li>"""
                modify_pdf(item.file.name, filename, url)
        except:
            raise serializers.ValidationError("Invalid pdf files")

        if validated_data.get("message") != "":
            message = validated_data.get("message")
        else:
            message = settings.approval_message

        if validated_data.get("subject") != "":
            subject = validated_data.get("subject")
        else:
            subject = settings.approval_subject

        if request.data.get("is_send_email") == "true":
            send_email(
                context={
                    "url": exact_url(request),
                    "fullname": fullname,
                    "message": message,
                    "list": template
                },
                from_email="email",
                recipient_list=[email],
                subject=subject,
                template_name="email_templates/file-access.html",
            )
        instance.save()
        return instance


class OTPSerializer(WritableNestedModelSerializer):

    class Meta:
        model = OTP
        fields = "__all__"

    def create(self, validated_data):
        request = self.context["request"]
        send_email(
            context={
                "url": exact_url(request),
                "code": validated_data.get("code"),
            },
            from_email="abdulhannanzarrar88@gmail.com",
            recipient_list=[validated_data.get("email")],
            subject="Hyperscale nexus email verification code",
            template_name="email_templates/otp.html",
        )

        data = OTP.objects.create(**validated_data)
        return data
