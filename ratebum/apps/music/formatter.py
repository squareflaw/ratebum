"""
----------------------------------------------------------------/

    formatter.py


this file contains utility functions to format all
spotify api results in order to retain only the 
desired data

----------------------------------------------------------------/


"""


def format_search_result(search_result):
    artists_from_search = search_result.get('artists')
    albums_from_search = search_result.get('albums')
    formatted_results = {}

    if artists_from_search:
        artists = []

        for artist in artists_from_search['items']:
            images_url_string = ','.join(
                [ image['url'] for image in artist['images']]
            )
            
            new_artist = {
                'name': artist['name'],
                'id': artist['id'],
                'images': images_url_string
            }
            artists.append(new_artist)

        formatted_results['artists'] = artists


    if albums_from_search:
        albums = []   

        for album in albums_from_search['items']:
            images_url_string = ','.join(
                [ image['url'] for image in album['images']]
            )

            new_album = {
                'name': album['name'],
                'artist': album['artists'][0]['name'],
                'release_date': album['release_date'][:4],
                'id': album['id'],
                'images': images_url_string
            }
            albums.append(new_album)

        formatted_results['albums'] = albums
        
    return formatted_results


def format_spotify_artist(spotify_artist):
    images_url_string = ','.join(
        [ image['url'] for image in spotify_artist['images']]
    )
    genres_string = ','.join(spotify_artist['genres'])

    if spotify_artist.get('followers') is int:
        followers = spotify_artist.get('followers')
    else:
        followers = spotify_artist.get('followers')['total']

    artist = {
        'name': spotify_artist['name'],
        'spotify_id': spotify_artist['id'],
        'spotify_url': spotify_artist['external_urls']['spotify'],
        'image_url': images_url_string,
        'genres': genres_string,
        'followers': followers,
        'popularity': spotify_artist['popularity'],
    }
    return artist


def format_spotify_album(spotify_album):
    images_url_string = ','.join(
        [ image['url'] for image in spotify_album['images']]
    )
    genres_string = ','.join(spotify_album.get('genres',''))

    duration_ms = sum(
        [track['duration_ms'] for track in spotify_album['tracks']['items']]
    )


    date = spotify_album['release_date'] if len(spotify_album['release_date']) > 4 else spotify_album['release_date'] + "-01-01"

    album = {
        'name': spotify_album['name'],
        'spotify_id': spotify_album['id'],
        'spotify_url': spotify_album['external_urls']['spotify'],
        'image_url': images_url_string,
        'genres': genres_string,
        'release_date': date,
        'total_tracks': spotify_album['total_tracks'],
        'duration_ms': duration_ms,
        'popularity': spotify_album['popularity'],
    }

    if spotify_album.get('tracks'):
        tracks = []
        for track in spotify_album['tracks']['items']:
            formatted_track = format_spotify_track(track)
            tracks.append(formatted_track)
        album['tracks'] = tracks 
    return album

def format_spotify_track(spotify_track):
    track = {
        'name': spotify_track['name'],
        'spotify_id': spotify_track['id'],
        'preview_url': spotify_track['preview_url'],
        'duration_ms': spotify_track['duration_ms'],
        'track_number': spotify_track['track_number'],
    }
    return track

