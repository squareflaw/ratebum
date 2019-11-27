from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from ratebum.apps.music.models import Album

class AlbumViewTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.urlName = 'music:get_album'
        self.album_id = '5oT2zoIrVGJcbVZoNGGZwc'
        self.url = reverse(self.urlName, kwargs={'id': self.album_id})
        self.response = self.client.get(self.url)

    def test_should_return_album_info(self):
        self.assertEqual(
            self.response.data['album']['name'],
            'Part 1 Everything Not Saved Will Be Lost')

    def test_should_return_album_tracks(self):
        self.assertEqual(
            self.response.data['album']['tracks'][3]['name'],
            'In Degrees')

    def test_should_return_error_404_if_cannot_get_album(self):
        url = reverse(self.urlName, kwargs={'id': 'thisisnotavalididforalbum'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
