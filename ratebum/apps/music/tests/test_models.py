# from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

from ratebum.apps.music.models import Artist, Album, Track



class MusicModelsTestCase(APITestCase):
    def setUp(self):
        self.artist = Artist(
            id=1,
            name='Foals',
            spotify_id='6FQqZYVfTNQ1pCqfkwVFEa',
            spotify_url='https://open.spotify.com/artist/6FQqZYVfTNQ1pCqfkwVFEa',
            image_url='https://i.scdn.co/image/338da113d4ff2bbd04d7925bd4148839956b3130',
            genres='garage rock, indie rock, indietronica, modern rock, new rave, oxford indie, rock',
            followers=905959,
            popularity=72
        )
        self.album = Album(
            id=1,
            name='Part 1 Everything Not Saved Will Be Lost',
            artist=self.artist,
            spotify_id='5oT2zoIrVGJcbVZoNGGZwc',
            spotify_url='https://open.spotify.com/album/5oT2zoIrVGJcbVZoNGGZwc',
            image_url='https://i.scdn.co/image/3f783c070dfcb9b3de8426c2d190632a795748f3',
            genres='garage rock, indie rock, rock',
            release_date='2019-03-08',
            total_tracks='10',
            duration_ms=2450,
            popularity=69,
        )        
        self.track = Track(
            id=1,
            name='In Degrees',
            album=self.album,
            spotify_id='2muJzxNCRL7M2QeCmjPubU',
            preview_url='https://p.scdn.co/mp3-preview/4337e60ce90ad63a07697231d14e7d2d81eba2b2?cid=470816bebb83446bac489c7e996f069c',
            duration_ms=297632,
            track_number=4
        )

    def test_should_create_Artist_instance(self):
        old_count = Artist.objects.count()
        self.artist.save()
        new_count = Artist.objects.count()
        self.assertNotEqual(old_count, new_count)

    def test_should_create_Album_instance(self):
        old_count = Album.objects.count()
        self.artist.save()
        self.album.save()
        new_count = Album.objects.count()
        self.assertNotEqual(old_count, new_count)
        
    def test_should_create_Track_instance(self):
        old_count = Track.objects.count()
        self.artist.save()
        self.album.save()
        self.track.save()
        new_count = Track.objects.count()
        self.assertNotEqual(old_count, new_count)













