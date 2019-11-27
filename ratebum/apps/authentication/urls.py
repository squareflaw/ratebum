from django.urls import path
from .views import RegistrationAPIView, LoginAPIView, UserRetrieveUpdateAPIView

app_name='auth'

urlpatterns = [
  path('user/', UserRetrieveUpdateAPIView.as_view(), name='retrieveUpdate'),
  path('users/', RegistrationAPIView.as_view(), name='registration'),
  path('users/login/', LoginAPIView.as_view(), name='login'),
]