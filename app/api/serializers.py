from drf_writable_nested.serializers import WritableNestedModelSerializer
from app.models import Note, Setting
from account.api.serializers import CreatedBySerializer


class NoteSerializer(WritableNestedModelSerializer):
    created_by = CreatedBySerializer(many=False, read_only=True)

    class Meta:
        model = Note
        fields = ("id", "name", "description",
                  "created_by", "created_at", "updated_at")


class SettingSerializer(WritableNestedModelSerializer):
    class Meta:
        model = Setting
        fields = "__all__"
