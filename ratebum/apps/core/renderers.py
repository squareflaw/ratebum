import json
from rest_framework.renderers import JSONRenderer
from rest_framework.utils.serializer_helpers import ReturnList

class RatebumJSONRenderer(JSONRenderer):
    charset = 'utf-8'
    object_label = 'object'

    def render(self, data, media_type=None, renderer_context=None):
        # If the view throws an error (such as the user can't be authenticated)
        # `data` will contain an `errors` key. 
        # the default JSONRenderer will handle rendering errors

        if type(data) is ReturnList:
            return json.dumps({
                self.pagination_object_label: data
            })

        if type(data) is dict:
            errors = data.get('errors', None)
            if errors is not None:
                return json.dumps({
                    'errors': data['errors']
                })

        return json.dumps({
          self.object_label: data
        })