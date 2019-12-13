import React from 'react';
import styled from 'styled-components'

import OrderingSelector from './OrderingSelector'
import Member from './Member'

const Wrapper = styled.div`
  max-width: 1000px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const List = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 10px;
`

const LineupList = (props) => {
  const members = props.members? props.members.map(member => {
    return (
      <Member
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
  }) : []

  return (
    // <MainDiv>
      <Wrapper>
        <OrderingSelector/>
        <List>
          {members}
        </List>
      </Wrapper>
    // </MainDiv>
  )
}

export default LineupList
