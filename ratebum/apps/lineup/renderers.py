from ratebum.apps.core.renderers import RatebumJSONRenderer

class MemberJSONRenderer(RatebumJSONRenderer):
    object_label = 'Member'
    pagination_object_label = 'Members'
    pagination_count_label = 'MembersCount'

