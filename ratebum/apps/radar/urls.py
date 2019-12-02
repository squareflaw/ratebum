from django.urls import path
from .views import (
    RadarAPIView,
)

app_name='radar'

urlpatterns = [
    # path(
    #     'radar/<str:spotify_id>',
    #     RadarAPIView.as_view(),
    #     name='radarDeleteItem'
    # ),
    path(
        'radar',
        RadarAPIView.as_view(),
        name='radar'
    ),
]