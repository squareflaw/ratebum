from django.db import models
from ratebum.apps.core.models import TimestampedModel


class RadarItem(TimestampedModel):
    TYPES = (('artist','Artist'), ('album','Album'))

    item_type = models.CharField(
        max_length=6,
        choices=TYPES,
        default=TYPES[0],
    )

    spotify_id = models.CharField(max_length=30)

    user = models.ForeignKey(
        'profiles.Profile', 
        on_delete=models.CASCADE, 
        related_name='radar_items'
    )

    artist = models.ForeignKey(
        'music.Artist', 
        on_delete=models.CASCADE, 
        related_name='radars'
    )

    album = models.ForeignKey(
        'music.Album', 
        on_delete=models.CASCADE, 
        related_name='radars',
        blank=True,
        null=True
    )

    note = models.CharField(max_length=200, blank=True, null=True)

def create_new_radar_item(item_instance, item_type, user, note):
    if item_type == 'artist':
        radar_item = RadarItem.objects.create(
            item_type=item_type,
            spotify_id=item_instance.spotify_id,
            user=user,
            artist=item_instance,
            note=note
        )
        return radar_item

    elif item_type == 'album':
        radar_item = RadarItem.objects.create(
            item_type=item_type,
            spotify_id=item_instance.spotify_id,
            user=user,
            artist=item_instance.artist,
            album=item_instance,
            note=note
        )
        return radar_item
    else:
        raise Exception('invalid type')


