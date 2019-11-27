from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

class RetrieveUpdateViewTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.urlName = 'auth:retrieveUpdate'
        self.user = self.setup_user()

    @staticmethod
    def setup_user():
        User = get_user_model()
        return User.objects.create_user(
            'test',
            email='testuser@test.com',
            password='test'
        )        

    def test_should_retrieve_user_information(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        response = self.client.get(reverse(self.urlName))
        self.assertEqual(response.data.get("email", None), self.user.email)

    def test_should_return_error_if_no_credentials(self):
        url = reverse(self.urlName)
        response = self.client.get(url)    
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_should_update_user_information(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        url = reverse(self.urlName)
        body = {
          "user":{
            "email": "another@email.com",
            'username': 'anotherUsername',
            'image': "panfiro.jpg"
          }
        }
        response = self.client.put(url, body)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get("email", None), "another@email.com")
        self.assertEqual(response.data.get("username",None), "anotherUsername")
        self.assertEqual(response.data.get("image", None), "panfiro.jpg")

    def test_should_update_password(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        url = reverse(self.urlName)
        body = {
          "user":{
            "password": "newPassword"
          }
        }
        response = self.client.put(url, body)
        loginResponse = self.client.post(reverse('auth:login'),{
            'user':{
                'email': self.user.email,
                'password': "newPassword"
            }
        })
        self.assertEqual(loginResponse.status_code, status.HTTP_200_OK)
        self.assertIsNotNone(loginResponse.data.get("token", None))

    def test_update_a_non_existing_field(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user.token)
        url = reverse(self.urlName)
        body = {
          "user":{
            "thisIsNotAField": "random Value"
          }
        }
        response = self.client.put(url, body)    
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
