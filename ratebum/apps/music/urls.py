from django.urls import path
from .views import (
    search, 
    get_artist_info, 
    get_album,
)

app_name='music'

urlpatterns = [
    path(
        'search',
        search,
        name='search'
    ),
    path(
        'artist/<str:id>',
        get_artist_info,
        name='get_artist'
    ),
    path(
        'album/<str:id>',
        get_album,
        name='get_album'
    ),
]