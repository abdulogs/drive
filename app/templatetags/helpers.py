from django import template
register = template.Library()


@register.filter
def placeholder(value):
    if value == "avatar.png":
        return "/src/images/avatar.png"
    elif value == "placeholder.png":
        return "/src/images/placeholder.png"
    else:
        return f"/media/{value}"

@register.filter
def is_checked(value, check):
    if value == check:
        return "checked"
    elif value == False:
        return ""
    return ""