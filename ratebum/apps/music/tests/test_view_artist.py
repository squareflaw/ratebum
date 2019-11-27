from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from ratebum.apps.music.models import Artist

class ArtistViewTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.urlName = 'music:get_artist'
        self.artist_id = '3mIj9lX2MWuHmhNCA7LSCW'
        self.url = reverse(self.urlName, kwargs={'id': self.artist_id})
        self.response = self.client.get(self.url)        

    def test_should_get_artist_info(self):
        self.assertEqual(self.response.data['artist']['name'], "The 1975")

    def test_should_get_artist_albums(self):
        self.assertIsNotNone(self.response.data.get('albums'))

    def test_should_get_artist_top_tracks(self):
        self.assertIsNotNone(self.response.data.get('topTracks'))

    def test_should_return_error_404_if_cannot_get_artist(self):
        url = reverse(self.urlName, kwargs={'id':'3mIj9lX2MWuHmhNCA7L'})
        response = self.client.get(url)    
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
