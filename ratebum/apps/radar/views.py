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
from .models import RadarItem, create_new_radar_item
from .renderers import RadarItemJSONRenderer
from .serializers import RadarItemSerializer

logger = logging.getLogger(__name__)

class RadarAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (RadarItemJSONRenderer,)
    serializer_class = RadarItemSerializer

    def get(self, request):
        radar_items = request.user.profile.radar_items.all().reverse()
        radar_items_serializer = RadarItemSerializer(radar_items, many=True)
        return Response(radar_items_serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        spotify_id = request.data.get('id')
        item_type = request.data.get('itemType')
        user = request.user.profile

        if not spotify_id or not item_type:
            raise ValidationError('id and itemType required')
        if user.radar_items.filter(spotify_id=spotify_id).exists():
            raise ValidationError('item is already in radar')
            
        music_model_instance = get_music_model_instance(spotify_id, item_type)
        radar_item = create_new_radar_item(music_model_instance,item_type,user)
        radar_item_serializer = RadarItemSerializer(radar_item)
        return Response(
            radar_item_serializer.data, 
            status=status.HTTP_201_CREATED
        )        

    def delete(self, request, spotify_id):
        profile = request.user.profile

        if not spotify_id:
            raise ValidationError('id required')

        if not profile.is_item_on_radar(spotify_id):
            raise ValidationError("item is not on user's radar")

        profile.radar_items.all().get(spotify_id=spotify_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
