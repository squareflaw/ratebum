import React from 'react';
import styled from 'styled-components'

const Btn = styled.button`
  padding: 5px;
  font-size: 1rem;
  margin: ${props => props.mw ? '10px auto' : '10px 10px 10px 0'};
  max-width: ${props => props.mw ? '100px' : 'none'};
  background: ${props => props.disable? 'none': 'var(--secundary-color)'};
  box-shadow: ${props => props.disable? 'none' :'2px 2px 2px 1px rgba(0, 0, 0, 0.25)'};
  border: ${props => props.disable? '2px solid var(--secundary-color)': 'none'};
  color: ${props => props.disable? 'var(--secundary-color)': 'var(--white)'};
  cursor: ${props => props.disable? 'inherit': 'pointer'};
  border-radius: 5px 5px;
`

const Button = (props) => (
  <Btn 
  onClick={props.func} 
  disable={props.disable} 
  onMouseOver={props.onMouseOver} 
  onMouseOut={props.onMouseOut}
  mw={props.mw}
  >
    {props.text}
  </Btn>
)

export default Button;