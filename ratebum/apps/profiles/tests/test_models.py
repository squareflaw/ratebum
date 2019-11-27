from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

from ratebum.apps.profiles.models import Profile
from ratebum.apps.authentication.models import User

class ProfleTestCase(APITestCase):

    def setUp(self):
        self.user = self.setup_user()
        self.profile = self.user.profile
        self.user2 = User.objects.create_user(
            'user2',
            email='user2@test.com',
            password='test')
        self.profile2 = self.user2.profile
        self.profile.follows.add(self.profile2)


    @staticmethod
    def setup_user():
        User = get_user_model()
        return User.objects.create_user(
            'test',
            email='testuser@test.com',
            password='test')

    def test_should_follow_other_user(self):
        self.assertTrue(self.profile.is_following(self.profile2))

    def test_should_be_followed_by_other_user(self):
        self.assertTrue(self.profile2.is_followed_by(self.profile))

    def test_should_stop_following_other_user(self):
        self.profile.unfollow(self.profile2)
        self.assertFalse(self.profile2.is_following(self.profile))
