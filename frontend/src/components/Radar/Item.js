import React from 'react';
import styled from 'styled-components'
import ItemButton from './ItemButton'

const MainDIV = styled.li`
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const ItemPic = styled.img`
  display:block;
  float:left;
  max-width: 100px;
  max-height: 100px;
  margin-right: 20px;
  margin-left: 5px;
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
  padding: 5px;
  font-family: var(--primary-font);
  font-weight: bold;
  font-size: 1rem;
  background-color: var(--white);
  color: var(--black); 
  margin-bottom: 10px;
  text-decoration: none;
`
const Position = styled.b`
  font-family: var(--secundary-font);
  color: var(--secundary-color);
  margin-bottom: 5px;
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

  const year = props.year? `${props.year}`: ''

  return (
    <MainDIV>
      <div>
        <ItemPic isArtist={props.isArtist} src={props.pic} alt="Item pic" />
        {props.isArtist ? (
          <Info>
            <Title href={props.spotify_url}><Position>{props.position}:</Position> {props.artistName}</Title>
          </Info>
        ) : (
          <Info>
            <Title href={props.spotify_url}><Position>{props.position}:</Position> {props.albumName}</Title>
            <Subtitle>
              <BandName>{props.artistName}</BandName>
            </Subtitle>
            <Subtitle>
            {year}
            </Subtitle>
          </Info>
        )}
      </div>
      <ItemButton
        id={props.id}
        date={props.date.match(/([^T]+)/)[0].split("-").reverse().join("/")}
        item={props.item}
        isInRadar={props.isInRadar}
        itemType={props.isArtist ? "artist" : "album"}
        componentType={props.componentType}
        addItem={props.addItem}
        deleteItem={props.deleteItem}
        addLineupMember={props.addLineupMember}
        deleteLineupMember={props.deleteLineupMember}
      />
    </MainDIV>
  );
}

export default Item;