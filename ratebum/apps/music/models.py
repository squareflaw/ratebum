from django.db import models
from rest_framework.exceptions import ( NotFound,)

from ratebum.apps.core.models import TimestampedModel
from ratebum.settings import spotify_api
from .formatter import (
    format_spotify_artist,
    format_spotify_album,
    format_spotify_track,
)

import logging

logger = logging.getLogger(__name__)

class Artist(TimestampedModel):
    name = models.CharField(max_length=100)
    spotify_id = models.CharField(max_length=500, unique=True)
    spotify_url = models.URLField(max_length=500)
    image_url = models.URLField(max_length=500)

    # genres separated by a comma (,)
    genres = models.CharField(max_length=500) 

    followers = models.PositiveIntegerField()
    popularity = models.SmallIntegerField()

    def __str__(self):
        return self.name

class Album(TimestampedModel):
    name = models.CharField(max_length=80)
    spotify_id = models.CharField(max_length=500, unique=True)
    spotify_url = models.URLField(max_length=500)

    artist = models.ForeignKey(
        'Artist',
        related_name='albums',
        on_delete=models.CASCADE
    )

    release_date = models.DateField()
    image_url = models.URLField(max_length=500)
    genres = models.CharField(max_length=500) 
    total_tracks = models.SmallIntegerField()
    duration_ms = models.IntegerField()
    popularity = models.SmallIntegerField()

    def __str__(self):
        return "{} ({})".format(self.name, self.release_date.year)

class Track(models.Model):
    name = models.CharField(max_length=80)
    spotify_id = models.CharField(max_length=500, unique=True)
    preview_url = models.URLField(max_length=500, null=True)

    album = models.ForeignKey(
        'Album',
        related_name='tracks',
        on_delete=models.CASCADE
    )

    duration_ms = models.IntegerField()
    track_number = models.SmallIntegerField()

    def __str__(self):
        return self.name


def get_music_model_instance(spotify_id, item_type):
    if item_type == 'artist':
        try:
            artist = Artist.objects.get(spotify_id=spotify_id)
        except Artist.DoesNotExist:
            artist = create_new_artist_from_spotify(spotify_id)
        return artist

    elif item_type == 'album':
        try:
            album = Album.objects.get(spotify_id=spotify_id)
        except Album.DoesNotExist:
            album = create_new_album_from_spotify(spotify_id)
        return album
    else:
        raise Exception('invalid type')


def create_new_artist_from_spotify(spotify_id):
    try:
        artist_from_spotify = spotify_api.get_artist(spotify_id)
    except:
        raise NotFound('Artist not found on Spotify database or Spotify API not avaliable')

    artist_data = format_spotify_artist(artist_from_spotify)
    artist = Artist.objects.create(**artist_data)
    return artist


def create_new_album_from_spotify(spotify_id):
    try:
        album_from_spotify = spotify_api.get_album(spotify_id)
    except:
        raise NotFound(
            'Album not found on Spotify database or Spotify API not avaliable')

    artist_id = album_from_spotify['artists'][0]['id']
    try:
        artist = Artist.objects.get(spotify_id=artist_id)
    except Artist.DoesNotExist:                    
        album_artist = spotify_api.get_artist(artist_id)
        artist_data = format_spotify_artist(album_artist)
        artist = Artist.objects.create(**artist_data)

    album_data = format_spotify_album(album_from_spotify)
    tracks_list = album_data.pop('tracks')
    album = Album.objects.create(artist=artist, **album_data)

    for track in tracks_list:
        Track.objects.create(album=album, **track)
        
    return album
