from django.db import models
from ratebum.apps.core.models import TimestampedModel
from ratebum.apps.music.models import Artist, Album

# Users are for authentication and authorization (permissions).

# By contrast, the Profile model is all about displaying a user’s information
# in the UI. Our client will include profile pages for each user, which
# is where the name of the Profile model comes from.

class Profile(TimestampedModel):
    # Every user will have one, and only one, related Profile model.
    user = models.OneToOneField(
        'authentication.User', on_delete=models.CASCADE)

    image = models.URLField(blank=True, null=True)

    artists_on_lineup = models.ManyToManyField(
        Artist,
        related_name='saved_on_lineup_by')

    follows = models.ManyToManyField(
        'self',
        related_name='followed_by', 
        symmetrical=False)

    def __str__(self):
        return self.user.username

    def is_item_on_radar(self, item_id):
        return self.radar_items.filter(spotify_id=item_id).exists()

    def is_artist_on_lineup(self, artist_id):
        return self.lineup_members.filter(spotify_id=artist_id).exists()

    def follow(self, profile):
        self.follows.add(profile)

    def unfollow(self, profile):
        self.follows.remove(profile)

    def is_following(self, profile):
        return self.follows.filter(pk=profile.pk).exists()

    def is_followed_by(self, profile):
        return self.followed_by.filter(pk=profile.pk).exists()

