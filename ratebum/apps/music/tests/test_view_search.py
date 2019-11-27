from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status



class SearchViewTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.urlName = 'music:search'
        self.query = 'arctic'
        self.types = 'artist'
        self.url = '{}?q={}&types={}'.format(
            reverse(self.urlName),
            self.query, 
            self.types
        )
        self.response = self.client.get(self.url)
        

    def test_should_return_search_results(self):
        self.assertEqual(
            self.response.data['searchResults']['artists'][0]['name'],
            "Arctic Monkeys"
        )
    
    def test_should_return_error400_with_no_query(self):
        url = '{}'.format(reverse(self.urlName))
        response = self.client.get(url)    
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_should_return_both_artist_n_albums_if_no_types(self):
        url = '{}?q={}'.format(reverse(self.urlName), self.query)
        response = self.client.get(url)
        self.assertIsNotNone(response.data['searchResults']['artists'])
        self.assertIsNotNone(response.data['searchResults']['albums'])

    def test_should_return_only_selected_type(self):
        url = '{}?q={}&types={}'.format(
            reverse(self.urlName),
            'foals',
            'album'
        )
        response = self.client.get(url)
        self.assertIsNotNone(response.data['searchResults'].get('albums'))
        self.assertIsNone(response.data['searchResults'].get('artists'))

