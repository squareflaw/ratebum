from rest_framework import serializers
from ratebum.apps.profiles.serializers import ProfileSerializer
from ratebum.apps.music.serializers import ArtistSerializer
from .models import Member

class MemberSerializer(serializers.ModelSerializer):
    spotify_id = serializers.CharField(read_only=True)
    user = ProfileSerializer(read_only=True)
    artist = ArtistSerializer(read_only=True)

    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = (
            'spotify_id',
            'artist',
            'user',
            'created_at',
            'updated_at',
        )

    def get_created_at(self, instance):
        return instance.created_at.isoformat()

    def get_updated_at(self, instance):
        return instance.updated_at.isoformat()

