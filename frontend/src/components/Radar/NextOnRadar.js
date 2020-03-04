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
const ItemPicContainer = styled.div`
  margin-right: 10px;
  @media (min-width: 768px) {
    margin-right: 3vw;
  }
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
const SubTitleDate = styled.p`
  font-family: var(--secundary-font);
  color: var(--gray);
  font-weight: lighter;
  font-size: .8rem;
  margin-bottom: 5px;
`

const TotalNumber = styled.b`
  background: var(--full-white);
  color: var(--secundary-color);
  font-weight: bold;
  border-radius: 4px;
  padding: 5px;
`


const NextOnRadar = (props) => {

  if(props.item){
    return (
      <MainDiv> 
        <SectionTitle>Next on your Radar:</SectionTitle>
        <Wrapper>
          <HelperDiv>
            <ItemPicContainer>
            <ItemPic 
              src={props.item.album? 
                props.item.album.image_url.split(',')[1]
                :
                props.item.artist.image_url.split(',')[1]
              } 
              alt="Item pic"
              />
              <SubTitleDate>
                Added {props.item.created_at.match(/([^T]+)/)[0].split("-").reverse().join("/")}
              </SubTitleDate>
            </ItemPicContainer>  
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
        <SubTitle style={{ textAlign: 'center', padding: '20px' }}><TotalNumber>{props.itemsCount}</TotalNumber> items on your radar</SubTitle>
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