from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

from ratebum.apps.authentication.backends import JWTAuthentication

class JWTAuthenticationTestCase(APITestCase):

    def setUp(self):
        self.user = self.setup_user()
        self.jwt_auth = JWTAuthentication()

    @staticmethod
    def setup_user():
        User = get_user_model()
        return User.objects.create_user(
            'test',
            email='testuser@test.com',
            password='test'
        )

    def test_should_return_user_info_from_token(self):
        request = MockRequest()
        request.set_auth(self.user.token)
        (user, token) = self.jwt_auth.authenticate(request)
        self.assertEqual(self.user.username, user.username)

class MockRequest():
    def __init__(self):
        self.META = {}
    def set_auth(self, token):
        self.META['HTTP_AUTHORIZATION'] = 'Token ' + token


        