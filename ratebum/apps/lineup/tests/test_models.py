from rest_framework.test import APITestCase

from ratebum.apps.authentication.models import User
from ratebum.apps.music.models import Artist
from ratebum.apps.lineup.models import Member

class LineupModelsTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            'user',
            email='user@gmail.com',
            password='django'
        )
        self.profile = self.user.profile
        self.artist = Artist.objects.create(
            id=1,
            name='Foals',
            spotify_id='6FQqZYVfTNQ1pCqfkwVFEa',
            spotify_url='https://open.spotify.com/artist/6FQqZYVfTNQ1pCqfkwVFEa',
            image_url='https://i.scdn.co/image/338da113d4ff2bbd04d7925bd4148839956b3130',
            genres='garage rock, indie rock, indietronica, modern rock, new rave, oxford indie, rock',
            followers=905959,
            popularity=72
        )
        self.member = Member(
            spotify_id=self.artist.spotify_id,
            user=self.profile,
            artist=self.artist
        )

    def test_should_create_Member_instance(self):
        old_count = Member.objects.count()
        self.member.save()
        new_count = Member.objects.count()
        self.assertNotEqual(old_count, new_count)



