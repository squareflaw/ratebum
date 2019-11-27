import React from 'react';
import styled from 'styled-components'
import Button from './Button'
import Menu from './Menu'

const StyledMenu = styled(Menu)`
  margin-left: 20px;
  cursor: pointer;
`

const ItemButton = (props) => {
  if(props.componentType === 'searchItem'){
    if(props.isInRadar){
      return (
        <Button 
          text='Saved'
          disable 
          func={() => null}
        />
      )
    }else{
      return (
        <Button 
          text='Add' 
          func={() => props.addItem(props.id, props.itemType)}
        />
      ); 
    }
  }else {
    return (
      <StyledMenu 
        delete={() => props.deleteItem(props.id)}
      />
    );
  }
}

export default ItemButton;