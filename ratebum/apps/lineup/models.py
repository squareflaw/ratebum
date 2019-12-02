from django.db import models
from ratebum.apps.core.models import TimestampedModel

class Member(TimestampedModel):

    spotify_id = models.CharField(max_length=30)

    user = models.ForeignKey(
        'profiles.Profile',
        on_delete=models.CASCADE, 
        related_name='lineup_members'
    )

    artist = models.ForeignKey(
        'music.Artist',        
        on_delete=models.CASCADE, 
        related_name='lineups'
    )