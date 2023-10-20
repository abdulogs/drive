from app.models import Setting

class SettingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            setting = Setting.objects.get(pk=1)
        except:
            setting = Setting.objects.create()

        request.setting = setting  
        response = self.get_response(request)
        return response
