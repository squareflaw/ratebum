from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from ratebum.apps.authentication.models import User

class RegistrationViewTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.urlName = 'auth:registration'
        self.body = {
          "user":{
            "username": "panfiro",
            "email": "panfiro@gmail.com",
            "password": "superpassword"
          }
        }
        self.response = self.client.post(reverse(self.urlName), self.body)        

    def test_should_register_new_user(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertIsNotNone(self.response.data.get("token", None))
        self.assertEqual(self.response.data.get("username", None), "panfiro")

    def test_should_return_error_if_missing_field(self):
        body = {
          "user":{
            "username": "Pepetrueno",
            "password": "pasoelmiohablameclaro"
          }
        }
        response = self.client.post(reverse(self.urlName), body)    
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_should_return_error_if_existing_email(self):
        email = self.body['user']['email']
        body = {
          "user":{
            "username": "Pepetrueno",
            "email": email,
            "password": "pasoelmiohablameclaro"
          }
        }
        response = self.client.post(reverse(self.urlName), body)    
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
