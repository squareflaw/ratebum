import React from 'react';
import styled from 'styled-components'

import OrderingSelector from './OrderingSelector'
import Item from './Member'

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

const LineupList = (props) => {
  const members = props.members.map(member => {
    return (
      <Item
        key={member.spotify_id}
        id={member.spotify_id}
        isArtist // to show the artist's picture circular
        pic={member.artist.image_url.split(',')[1]}
        artistName={member.artist.name}
        spotify_url={member.artist.spotify_url}
        genres={member.artist.genres}
        deleteItem={props.deleteItem}
      />
    )
  })

  return (
    <MainDiv>
      <Wrapper>
        <OrderingSelector/>
        <List>
          {members}
        </List>
      </Wrapper>
    </MainDiv>
  )
}

export default LineupList
