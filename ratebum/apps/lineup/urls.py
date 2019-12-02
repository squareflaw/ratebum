from django.urls import path
from .views import (
    LineupAPIView,
)

app_name = 'lineup'

urlpatterns = [
    path(
        'lineup/<str:spotify_id>',
        LineupAPIView.as_view(),
        name='lineupDeleteMember'
    ),
    path(
        'lineup/',
        LineupAPIView.as_view(),
        name='lineup'
    ),  
]