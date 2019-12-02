from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

import logging

logger = logging.getLogger(__name__)

class RadarViewTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.urlName = 'radar:radar'
        self.user = self.setup_user()
        self.profile = self.user.profile
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)

        self.album_id = '5oT2zoIrVGJcbVZoNGGZwc'
        self.album_type = 'album'
        self.album_body = {"id":self.album_id, 'itemType':self.album_type}
        self.album_response = self.client.post(reverse(self.urlName), self.album_body)

        self.artist_id = '5INjqkS1o8h1imAzPqGZBb'
        self.artist_type = 'artist'
        self.artist_body = {"id":self.artist_id, 'itemType':self.artist_type}
        self.artist_response = self.client.post(reverse(self.urlName), self.artist_body)

    @staticmethod
    def setup_user():
        User = get_user_model()
        return User.objects.create_user(
            'test',
            email='testuser@test.com',
            password='test'
        )        

    def test_should_create_new_album_item(self):
        logger.debug(self.album_response.data)
        self.assertEqual(
            self.album_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            self.album_response.data['album']['spotify_id'],
            self.album_id)

    def test_should_find_new_album_in_profile_radar(self):
        self.assertTrue(
            self.profile.radar_items.all().get(
                album__spotify_id=self.album_id))

    def test_should_create_new_artist_item(self):
        self.assertEqual(
            self.artist_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            self.artist_response.data['artist']['spotify_id'], 
            self.artist_id)


    def test_should_find_new_artist_in_profile_radar(self):
        self.assertTrue(
            self.profile.radar_items.all().get(
                artist__spotify_id=self.artist_id))

    def test_should_return_error_if_item_is_already_in_radar(self):
        response = self.client.post(reverse(self.urlName), self.album_body)
        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_should_get_radar_items(self):
        response = self.client.get(reverse(self.urlName))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNotNone(
            response.data[0]['artist']['spotify_id'])

    def test_should_delete_radar_item(self):
        urlName = 'radar:radarDeleteItem'
        url = reverse(urlName, kwargs={'spotify_id':self.album_id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(self.profile.is_item_on_radar(self.album_id)) 

    def test_should_return_404_NOT_FOUND_if_album_id_is_wrong(self):
        body = {'id': 'wrongid', 'itemType': self.album_type}
        response = self.client.post(reverse(self.urlName), body)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_should_return_401_UNAUTHORIZED_if_no_token_provided(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ')
        response = self.client.get(reverse(self.urlName))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    

