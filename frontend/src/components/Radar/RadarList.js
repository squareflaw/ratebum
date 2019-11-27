import React from 'react';
import styled from 'styled-components'

import OrderingSelector from './OrderingSelector'
import Item from '../Item'

const MainDiv = styled.div`
  padding: 20px;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`
const List = styled.ul`
  padding: 20px 0;
`

const RadarList = (props) => {
  const Items = props.items.map(item => {
    return (
      <Item
        key={item.spotify_id}
        id={item.spotify_id}
        isArtist={!item.album}
        pic={item.album? 
          item.album.image_url.split(',')[1]
          :
          item.artist.image_url.split(',')[1]
        }
        artistName={item.artist.name}
        albumName={item.album? item.album.name: ''}
        spotify_url={item.album? item.album.spotify_url : item.artist.spotify_url}
        year={item.album? item.album.release_date.slice(0,4):''}
        genres={!item.album? item.artist.genres: ''}
        deleteItem={props.deleteItem}
      />
    )
  })

  return (
    <MainDiv> 
      <Wrapper>
        <OrderingSelector/> 
        <List>
          {Items}
        </List>
      </Wrapper>
    </MainDiv>
  )
}

export default RadarList;