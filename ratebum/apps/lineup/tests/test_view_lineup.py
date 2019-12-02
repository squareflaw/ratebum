from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

class LineupViewTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.url_name = 'lineup:lineup'
        self.user = self.setup_user()
        self.profile = self.user.profile
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)

        self.artist_id = '5INjqkS1o8h1imAzPqGZBb'
        self.body = {"id":self.artist_id}
        self.member_response = self.client.post(reverse(self.url_name), self.body)

    @staticmethod
    def setup_user():
        user = get_user_model()
        return user.objects.create_user(
            'test',
            email='testuser@test.com',
            password='test'
        ) 

    def test_should_create_new_album_item(self):
        self.assertEqual(
            self.member_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            self.member_response.data['spotify_id'],
            self.artist_id)

    def test_should_get_lineup_members(self):
        response = self.client.get(reverse(self.url_name))
        self.assertIsNotNone(response.data[0]['spotify_id'])