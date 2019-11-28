import base64
import requests

def get_access_token(client_id, client_secret):
    url = 'https://accounts.spotify.com/api/token'
    ACCESS_TOKEN = None

    credentials = client_id + ':' + client_secret
    encoded_credentials = base64.b64encode(credentials.encode('utf-8'))
    headers = {
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': 'Basic {}'.format(encoded_credentials.decode("utf-8"))
    }
    data = {'grant_type':'client_credentials'}

    response = requests.post(url, headers=headers, data=data)
    response.raise_for_status()
    return response.json().get('access_token', None)


class SpotifyAPI():    
    def __init__(self, client_id, client_secret):
        self.client_id = client_id
        self.client_secret = client_secret
        self._token = get_access_token(self.client_id,self.client_secret)
    
    def generate_headers(self):
        return {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer {}'.format(self._token)
        }

    def get(self, url, params=None, data=None):
        response = requests.get(
            url,
            headers=self.generate_headers(),
            params=params,
            data=data
        )

        if response.status_code >= 400 and response.status_code != 401: 
            response.raise_for_status()

        # if we get an error 401 it may be that our access token
        # has expired, we refresh the token getting a new one 
        # and try again the request
        if response.status_code == 401:
            self._token = get_access_token(self.client_id,self.client_secret)

            response = requests.get(
                url,
                headers=self.generate_headers(),
                params=params,
                data=data
            )
            response.raise_for_status()

        return response.json()

    def search(self, query, types, limit):
        url = 'https://api.spotify.com/v1/search'
        params = {'q':query, 'type':types, 'limit':limit}
        search_results = self.get(url, params=params) 
        return search_results

    # ------------------------------------------------------------------
    #   ARTIST 
    # ------------------------------------------------------------------

    def get_artist(self, id):
        url = 'https://api.spotify.com/v1/artists/{}'.format(id)
        return self.get(url)


    def get_albums_from_artist(self, id):
        url = 'https://api.spotify.com/v1/artists/{}/albums'.format(id)
        results = self.get(url)
        return results.get('items', [])

    def get_top_tracks_from_artist(self, id):
        url = 'https://api.spotify.com/v1/artists/{}/top-tracks'.format(id)
        params = {'country':'US'}
        results = self.get(url,params=params)
        return results.get('tracks', [])

    # ------------------------------------------------------------------
    #   ALBUM 
    # ------------------------------------------------------------------

    def get_album(self, id):
        url = 'https://api.spotify.com/v1/albums/{}'.format(id)
        return self.get(url)
        return results.get('tracks', [])

    # ------------------------------------------------------------------
    #   ANALYSIS 
    # ------------------------------------------------------------------

    def get_analysis(self, id):
        url = 'https://api.spotify.com/v1/audio-analysis/{}'.format(id)
        return self.get(url)
        

if __name__ == '__main__':

    CLIENT_ID = '470816bebb83446bac489c7e996f069c'
    CLIENT_SECRET = 'fad5841e54d9454ab982cd628a30caf0'

    spotify = SpotifyAPI(CLIENT_ID, CLIENT_SECRET)

    def get_artist_top_song_analysis(artist_name_query):
        song_id = get_artist_top_song_id(artist_name_query)
        return spotify.get_analysis(song_id)

    def get_artist_top_song_id(artist_name_query):
        artists_search_results = spotify.search(artist_name_query, 'artist', 5)
        artist_id = artists_search_results['artists']['items'][0]['id']
        results = spotify.get_top_tracks_from_artist(artist_id)
        top_song_id = results[0]['id']
        return top_song_id

    def print_top_tracks(artist_name):
        search_results = spotify.search(artist_name,'artist', 5)
        artist_id = search_results['artists']['items'][0]['id']
        top_tracks = spotify.get_top_tracks_from_artist(artist_id)

        print('\n')
        
        for track in top_tracks:
            track_name = track['name']
            track_date = track['album']['release_date']
            track_popularity = track['popularity']

            string_format = '{} {} ({})'.format(track_popularity, track_name, track_date)
            print(string_format)

        print('\n')

    print_top_tracks('franz')


        

