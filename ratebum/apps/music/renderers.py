from ratebum.apps.core.renderers import RatebumJSONRenderer

class ArtistJSONRenderer(RatebumJSONRenderer):
  object_label = 'artist'
  pagination_object_label = 'artists'
  pagination_count_label = 'artistsCount'

class AlbumJSONRenderer(RatebumJSONRenderer):
  object_label = 'album'
  pagination_object_label = 'albums'
  pagination_count_label = 'albumsCount'

