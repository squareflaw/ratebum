import React from 'react'
import styled from 'styled-components'
import ItemButton from '../ItemButton' 

const MainDIV = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 40px 0;
`

const MemberContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ItemPic = styled.img`
  display:block;
  max-width: 100px;
  max-height: 100px;
  border-radius: 50%;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.25);
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: center;
  padding: 10px;
`

const Title = styled.a`
  font-family: var(--primary-font);
  font-weight: bold;
  font-size: 1rem;
  color: var(--full-white);
  margin-bottom: 10px;
  text-decoration: none;
`
// const Subtitle = styled.p`
//   font-family: var(--secundary-font);
//   color: var(--semi-white);
//   font-weight: lighter;
//   font-size: 1rem;
//   margin-bottom: 5px;
// `


const Member = (props) => {
    return (
        <MainDIV>
            <MemberContainer>
                <ItemPic isArtist={props.isArtist} src={props.pic} alt="Item pic"/>
                <Info>
                    <Title href={props.spotify_url}>{props.artistName}</Title>
                </Info>          
            </MemberContainer>
            <ItemButton 
                id={props.id} 
                isInRadar={props.isInRadar} 
                itemType={'artist'}
                componentType={props.componentType} 
                addItem={props.addItem}
                deleteItem={props.deleteItem}
            />
        </MainDIV>
    )
}

export default Member
