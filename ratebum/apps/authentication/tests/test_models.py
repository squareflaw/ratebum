import jwt
from django.conf import settings
from rest_framework.test import APITestCase, APIClient

from ratebum.apps.authentication.models import User

class UserTestCase(APITestCase):
    def setUp(self):
        self.user = User(
            username="Panfiro",
            email="panfiro@gmail.com",
            password="superpass" 
        )

    def test_should_create_user(self):
        old_count = User.objects.count()
        self.user.save()
        new_count = User.objects.count()
        self.assertNotEqual(old_count, new_count)

    def test_should_get_full_name(self):
        expected = self.user.username
        result = self.user.get_full_name()
        self.assertEqual(result, expected)

    def test_should_generate_valid_token(self):
        self.user.save()
        generated_token = self.user.token
        info_from_token = jwt.decode(generated_token, settings.SECRET_KEY)
        self.assertEqual(info_from_token['id'], self.user.id)

