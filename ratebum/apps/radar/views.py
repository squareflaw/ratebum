# import logging

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import (
    ValidationError,
)

from django.core.paginator import Paginator, EmptyPage

from ratebum.apps.music.models import get_music_model_instance
from .models import create_new_radar_item
from .renderers import RadarItemJSONRenderer
from .serializers import RadarItemSerializer

# logger = logging.getLogger(__name__)

class RadarAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    # renderer_classes = (RadarItemJSONRenderer,)
    serializer_class = RadarItemSerializer

    def get(self, request):
        order = self.request.query_params.get('o', 'old')
        if order == 'new':
            radar_items = request.user.profile.radar_items.all()
        else:
            radar_items = request.user.profile.radar_items.all().reverse()
            
        items_total_count = radar_items.count()
        page_number = self.request.query_params.get('p', 1)
        paginator = Paginator(radar_items, 20)
        try:
            radar_items_serializer = RadarItemSerializer(paginator.page(page_number), many=True)
        except EmptyPage:
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response({
                "radarItems":radar_items_serializer.data , 
                "totalCount":items_total_count
            }, status=status.HTTP_200_OK
        )

    def post(self, request): 
        spotify_id = request.data.get('id')
        item_type = request.data.get('itemType')
        note = request.data.get('note', '')
        user = request.user.profile

        if not spotify_id or not item_type:
            raise ValidationError('id and itemType required')
        if user.radar_items.filter(spotify_id=spotify_id).exists():
            raise ValidationError('item is already in radar')

        music_model_instance = get_music_model_instance(spotify_id, item_type)
        radar_item = create_new_radar_item(music_model_instance, item_type, user, note)
        radar_item_serializer = RadarItemSerializer(radar_item)
        return Response({
                "radarItem":radar_item_serializer.data
            }, status=status.HTTP_201_CREATED
        )

    def delete(self, request, spotify_id):
        profile = request.user.profile

        if not spotify_id:
            raise ValidationError('id required')

        if not profile.is_item_on_radar(spotify_id):
            raise ValidationError("item is not on user's radar")

        profile.radar_items.all().get(spotify_id=spotify_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class RadarUpdateNoteAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RadarItemSerializer

    def post(self, request, spotify_id):
        profile = request.user.profile
        note = request.data.get('note','')
        radarItem = profile.radar_items.all().get(spotify_id=spotify_id)
        radarItem.note = note
        radarItem.save()
        return Response(status=status.HTTP_200_OK)
