from pathlib import Path
from os.path import join
from datetime import timedelta

#########################
#  BASE_DIR / "subdir". #
BASE_DIR = Path(__file__).resolve().parent.parent
#  BASE_DIR / "subdir". #
#########################


##############
# Secret key #
SECRET_KEY = "django-insecure-u)&*^7d6w785gkfm&yj_l!e-oyoj*by45y%urs5$v_p#u7=6sx"
# Secret key #
##############

##############
# Debug mode #
DEBUG = True


ALLOWED_HOSTS = ["*"]
# Debug mode #
##############


################
# Applications #
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.sessions",
    "django.contrib.contenttypes",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    "corsheaders",
    "pwa",
    "rest_framework",
    "rest_framework_simplejwt",
    "django_filters",
    "smartfields",
    "active_link",
    "account.apps.AccountConfig",
    "app.apps.AppConfig",
    "drive.apps.DriveConfig",
]
# Applications #
################


################
# Middlewares #
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "app.middleware.SettingMiddleware",
]
# Middlewares #
###############


#####################
# App urls or setup #
ROOT_URLCONF = "config.urls"

SITE_ID = 1

CORS_ALLOW_ALL_ORIGINS = True
# App urls or setup #
#####################

#############
# Templates #
TEMPLATES_DIR = join(BASE_DIR, "public")


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [TEMPLATES_DIR],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "app.context_processors.setting",
                "drive.context_processors.remainder",
            ],
        },
    },
]
# Templates #
#############


######################
# Application server #
WSGI_APPLICATION = "config.wsgi.application"

X_FRAME_OPTIONS = "SAMEORIGIN"
# Application server #
######################


###########################
# Database configurations #
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
        # "ENGINE": "django.db.backends.mysql",
        # "NAME": "abdulogs",
        # "USER": "root",
        # "PASSWORD": "",
        # "HOST": "localhost",
        # "PORT": 3306,
    }
}
# Database configurations #
###########################


#######################
# Password validation #
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]
# Password validation #
#######################


########################
# Internationalization #
LANGUAGE_CODE = "ur"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True
# Internationalization #
########################


################
# Static files #
STATIC_DIR = join(BASE_DIR, "src")
STATIC_URL = "/src/"
STATICFILES_DIRS = [STATIC_DIR]
# Static files #
################


################
# Uploads path #
MEDIA_ROOT = join(BASE_DIR, "media")
MEDIA_URL = "/media/"
# Uploads path #
################


######################
# SMTP Configuration #
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "abdulhannanzarrar88@gmail.com"
EMAIL_HOST_PASSWORD = "lagokszekpgdpvrm"
# SMTP Configuration #
######################


###################
# User Auth model #
AUTH_USER_MODEL = "account.User"
# User Auth model #
###################


##########################
# Authentication backend #
AUTHENTICATION_BACKENDS = ("account.forms.EmailBackend",)
# Authentication backend #
##########################


#####################
# JWT Configuration #
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=2)
}
# JWT Configuration #
#####################

######################
# Cors Configuration #
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:8000",
]
# Cors Configuration #
######################


#####################
# Password reset time
PASSWORD_RESET_TIMEOUT = 10000
# Password reset time
#####################


#######################
# Default primary key #
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
# Default primary key #
#######################
