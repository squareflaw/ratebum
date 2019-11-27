import React from 'react';
import styled from 'styled-components'

import Item from '../Item'

const MainDiv = styled.div`
  padding: 50px 20px;
  max-width: 600px;
  margin: 0 auto;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%:
`

const Section = styled.div`
  margin 20px 0;
  width: 100%:
`
const SectionTitle = styled.p`
  margin: 20px;
  font-family: var(--primary-font);
  font-size: 2rem;
`

const List = styled.ul`
  margin 20px 0;  
`

const Results = (props) => {

  const isItemAlreadyInRadar = id => {
    const count = props.radarItems.length
    for(let i = 0; i <count; i++) {
      if(props.radarItems[i].spotify_id === id){
        return true
      }
    }
    return false
  }

  const artistsList = props.artists? props.artists.map(artist => (
    <Item 
      isArtist 
      key={artist.id}
      id={artist.id}
      spotify_url={`https://open.spotify.com/artist/${artist.id}`}
      isInRadar={isItemAlreadyInRadar(artist.id)}      
      artistName={artist.name}
      pic={artist.images.split(',').slice(-1)[0]} 
      componentType='searchItem'
      addItem={props.addItem}
    />
  )):null

  const albumsList = props.albums? props.albums.map(album => (
    <Item 
      key={album.id}
      id={album.id}
      spotify_url={`https://open.spotify.com/album/${album.id}`}
      isInRadar={isItemAlreadyInRadar(album.id)}
      albumName={album.name}
      artistName={album.artist}
      year={album.release_date}
      pic={album.images.split(',').slice(-1)[0]} 
      componentType='searchItem'
      addItem={props.addItem}
    />
  )):null

  const resultsList = props.artist || props.albums? (
    <Wrapper>
      <Section>
          <SectionTitle>Artists:</SectionTitle>
          <List>
            {artistsList}
          </List>
      </Section>
      <Section>
          <SectionTitle>Albums:</SectionTitle>
          <List>
            {albumsList}
          </List>
      </Section>
    </Wrapper>
  ): null

  return (
    <MainDiv> 
      {resultsList}
    </MainDiv>
  )
}

export default Results;