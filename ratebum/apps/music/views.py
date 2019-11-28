# from itertools import chain
import logging
from requests.exceptions import HTTPError

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import (
    PermissionDenied, 
    NotFound,
    ValidationError,
)

from ratebum.settings import spotify_api
from .models import Artist, Album, Track
from .serializers import ArtistSerializer, AlbumSerializer
from .formatter import (
    format_search_result,
    format_spotify_artist,
    format_spotify_album,
    format_spotify_track,
)

logger = logging.getLogger(__name__)

@api_view()
def search(request):
    query = request.query_params.get('q')
    types = request.query_params.get('types', 'artist,album')
    limit = request.query_params.get('limit', 5)

    if query is None:
        raise ValidationError('a q parameter is necesary in a search request')
    if query.strip() == '':
        raise ValidationError('query parameter cannot be empty')

    search_results = spotify_api.search(query, types, limit)
    formatted_results = format_search_result(search_results)

    response = {
        'searchResults': formatted_results
    }
    return Response(response, status=status.HTTP_200_OK)  


@api_view()
def get_artist_info(request, id):
    try:
        artist = spotify_api.get_artist(id)
    except:
        raise NotFound(
            'Artist not found on Spotify database or Spotify API not avaliable')

    formatted_artist = format_spotify_artist(artist)

    albums = spotify_api.get_albums_from_artist(artist['id'])
    lp_albums = [album for album in albums if album['album_type'] == 'album']

    top_tracks = spotify_api.get_top_tracks_from_artist(artist['id'])

    response = {
        'artist': formatted_artist, 
        'albums': lp_albums, 
        'topTracks': top_tracks
    }
    return Response(response, status=status.HTTP_200_OK)


@api_view()
def get_album(request, id):
    try:
        album = spotify_api.get_album(id)
    except:
        raise NotFound('Album not found on Spotify database or Spotify API not avaliable')

    formatted_album = format_spotify_album(album)
    response = {'album': formatted_album}
    return Response(response, status=status.HTTP_200_OK)
