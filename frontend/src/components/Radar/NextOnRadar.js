import React from 'react';
import styled from 'styled-components'
import Button from '../Button'
import Menu from './Menu'


const MainDiv = styled.div`
  padding: 20px;
  background: var(--primary-dark-color);
`
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;
`

const HelperDiv = styled.div`
  display: flex;
  align-items: flex-start;
`

const SectionTitle = styled.h3`
  margin-bottom: 20px;
  font-weight: lighter;
  text-align: center;
  font-size: 1.4rem;
`
const ItemPic = styled.img`
  width: 30vw;
  max-width: 300px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.25);
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: center;
`

const Title = styled.h2`
  font-family: var(--primary-font);
  font-weight: bold;
  background-color: var(--white);
  color: var(--black);
  font-size: 1rem;
  padding: 5px;
  margin-bottom: 10px;
`
const SubTitle = styled.p`
  font-family: var(--secundary-font);
  color: var(--semi-white);
  font-weight: lighter;
  font-size: 1rem;
  margin-bottom: 5px;
`


const NextOnRadar = (props) => {

  if(props.item){
    return (
      <MainDiv> 
        <SectionTitle>Next on your Radar:</SectionTitle>
        <Wrapper>
          <HelperDiv>
            <div style={{ marginRight: '10px'}}>
            <ItemPic 
              src={props.item.album? 
                props.item.album.image_url.split(',')[1]
                :
                props.item.artist.image_url.split(',')[1]
              } 
              alt="Item pic"
              />
              <SubTitle>
                Added {props.item.created_at.match(/([^T]+)/)[0].split("-").reverse().join("/")}
              </SubTitle>
            </div>  
            {props.item.album ? 
              <AlbumItem item={props.item}/> 
              : 
              <ArtistItem item={props.item}/> 
            }
          </HelperDiv>
          <Menu 
            deleteItem={() => props.deleteItem(props.item.spotify_id)}
          />
        </Wrapper>
        <SubTitle style={{textAlign:'center', padding: '20px'}}>{props.itemsCount} items on your radar</SubTitle>
      </MainDiv>
    )    
  }else {
    return null
  }
}

const ArtistItem = (props) => (
  <Info>
    <Title>{props.item.artist.name}</Title>
    <SubTitle>{
      props.item.artist.genres.split(',').slice(0,2).join(', ')
    }</SubTitle>
    <a href={props.item.artist.spotify_url}>
      <Button text='See on Spotify'/>
    </a>
  </Info>
)

const AlbumItem = (props) => (
  <Info>
    <Title>{props.item.album.name}</Title>
    <SubTitle>{props.item.artist.name}</SubTitle>
    <SubTitle>{props.item.album.release_date.slice(0,4)}</SubTitle>
    <a href={props.item.album.spotify_url}>
      <Button text='Listen on Spotify'/>
    </a>
  </Info>
)

export default NextOnRadar;