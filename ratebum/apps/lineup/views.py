# from itertools import chain
import logging
from requests.exceptions import HTTPError

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import (
    PermissionDenied,
    NotFound,
    ValidationError,
)

from ratebum.apps.music.models import get_music_model_instance
from .models import Member
from .renderers import MemberJSONRenderer
from .serializers import MemberSerializer

logger = logging.getLogger(__name__)

class LineupAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (MemberJSONRenderer,)
    serializer_class = MemberSerializer

    def get(self, request):
        member = request.user.profile.lineup_members.all().reverse()
        member_serializer = self.serializer_class(member, many=True)
        return Response(member_serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        spotify_id = request.data.get('id')
        user = request.user.profile

        if user.lineup_members.filter(spotify_id=spotify_id).exists():
            raise ValidationError('member is already in lineup')
            
        artist_model_instance = get_music_model_instance(spotify_id, 'artist')
        member = Member.objects.create(
            spotify_id=artist_model_instance.spotify_id,
            user=user,
            artist=artist_model_instance
        )
        member_serializer = self.serializer_class(member)
        return Response(
            member_serializer.data, 
            status=status.HTTP_201_CREATED
        )        

    # def delete(self, request, spotify_id):
    #     profile = request.user.profile

    #     if not spotify_id:
    #         raise ValidationError('id required')

    #     if not profile.is_item_on_radar(spotify_id):
    #         raise ValidationError("item is not on user's radar")

    #     profile.radar_items.all().get(spotify_id=spotify_id).delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
