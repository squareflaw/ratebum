import React from 'react';
import styled from 'styled-components'
import ItemButton from './ItemButton'

const MainDIV = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 40px 0;
`

const ItemPic = styled.img`
  display:block;
  float:left;
  max-width: 100px;
  max-height: 100px;
  margin-right: 20px;
  border-radius: ${props => props.isArtist? '50%;': '0;'}
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.25);
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: center;
  padding-right: 10px;
`

const Title = styled.a`
  font-family: var(--primary-font);
  font-weight: bold;
  font-size: 1rem;
  color: var(--full-white);
  margin-bottom: 10px;
  text-decoration: none;
`
const Subtitle = styled.p`
  font-family: var(--secundary-font);
  color: var(--semi-white);
  font-weight: lighter;
  font-size: 1rem;
  margin-bottom: 5px;
`

const BandName = styled.b`
  color: var(--white);
  font-weight: 350;
`

const Item = (props) => {

  const year = props.year? ` - ${props.year}`: ''

  const secundaryInfo = props.genres? (
    <Subtitle>
      {props.genres.split(',').slice(0,2).join(', ')}
    </Subtitle>
  ):null;

  return(
    <MainDIV>
      <div>
        <ItemPic isArtist={props.isArtist} src={props.pic} alt="Item pic"/>
        {props.isArtist?
          (
            <Info>
              <Title href={props.spotify_url}>{props.artistName}</Title>
              {secundaryInfo}
            </Info>
          ):(
            <Info>
              <Title href={props.spotify_url}>{props.albumName}</Title>
              <Subtitle>
                <BandName>{props.artistName}</BandName>{year}
              </Subtitle>
            </Info>
          )
        }    
      </div>
      <ItemButton 
        id={props.id} 
        isInRadar={props.isInRadar} 
        itemType={props.isArtist? 'artist': 'album'}
        componentType={props.componentType} 
        addItem={props.addItem}
        deleteItem={props.deleteItem}
      />
    </MainDIV>
  )
}

export default Item;