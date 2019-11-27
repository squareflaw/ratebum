# from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

from ratebum.apps.authentication.models import User
from ratebum.apps.radar.models import RadarItem
from ratebum.apps.music.models import Artist, Album



class MusicModelsTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            'user',
            email='user@test.com',
            password='test')
        self.profile = self.user.profile
        self.artist = Artist.objects.create(
            id=1,
            name='Foals',
            spotify_id='6FQqZYVfTNQ1pCqfkwVFEa',
            spotify_url='https://open.spotify.com/artist/6FQqZYVfTNQ1pCqfkwVFEa',
            image_url='https://i.scdn.co/image/338da113d4ff2bbd04d7925bd4148839956b3130',
            genres='garage rock, indie rock, indietronica, modern rock, new rave, oxford indie, rock',
            followers=905959,
            popularity=72
        )
        self.album = Album.objects.create(
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
        self.artist_radar_item = RadarItem(
            item_type='artist',
            spotify_id=self.artist.spotify_id,
            user=self.profile,
            artist=self.artist,
        )
        self.album_radar_item = RadarItem(
            item_type='artist',
            spotify_id=self.artist.spotify_id,
            user=self.profile,
            artist=self.artist,
            album=self.album,
        )
        

    def test_should_create_Artist_RadarItem_instance(self):
        old_count = RadarItem.objects.count()
        self.artist_radar_item.save()
        new_count = RadarItem.objects.count()
        self.assertNotEqual(old_count, new_count)

    def test_should_create_Album_RadarItem_instance(self):
        old_count = RadarItem.objects.count()
        self.album_radar_item.save()
        new_count = RadarItem.objects.count()
        self.assertNotEqual(old_count, new_count)












