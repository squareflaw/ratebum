import React from 'react';
import styled from 'styled-components'

import Item from './Item'
import OrderSwitch from './OrderSwitch';

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
`
const List = styled.ul`
  width: 100%;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 2rem;
`

const RadarList = (props) => {
  const Items = props.items.map(item => {
    return (
      <Item
        key={item.spotify_id}
        id={item.spotify_id}
        isArtist={!item.album}
        pic={item.album ? 
          item.album.image_url.split(',')[1]
          :
          item.artist.image_url.split(',')[1]
        }
        artistName={item.artist.name}
        albumName={item.album ? item.album.name : ''}
        spotify_url={item.album ? item.album.spotify_url : item.artist.spotify_url}
        year={item.album ? item.album.release_date.slice(0, 4) : ''}
        genres={!item.album ? item.artist.genres : ''}
        date={item.created_at}
        deleteItem={props.deleteItem}
      />
    )
  })

  return (
    <Wrapper>
      <OrderSwitch/>
      <List>
        {Items}
      </List>
    </Wrapper>
  )
}

export default RadarList
