from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from ratebum.apps.authentication.models import User

class LoginViewTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.urlName = 'auth:login'
        self.user = self.setup_user()

    @staticmethod
    def setup_user():
        User = get_user_model()
        return User.objects.create_user(
            'test',
            email='testuser@test.com',
            password='test'
        )        

    def test_should_login_user(self):
        body = {
          "user":{
            "email": self.user.email,
            "password": 'test'
          }
        }
        response = self.client.post(reverse(self.urlName), body)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNotNone(response.data.get("token", None))

    def test_should_not_login_with_wrong_password(self):
        body = {
          "user":{
            "email": self.user.email,
            "password": 'thisIsNotThePassword'
          }
        }
        response = self.client.post(reverse(self.urlName), body)    
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIsNotNone(response.data.get("errors", None))
