from django.apps import AppConfig

class AuthenticationAppConfig(AppConfig):
  name = 'ratebum.apps.authentication'
  label = 'authentication'
  verbose_name = 'Authentication'

  def ready(self):
    import ratebum.apps.authentication.signals

default_app_config = 'ratebum.apps.authentication.AuthenticationAppConfig'