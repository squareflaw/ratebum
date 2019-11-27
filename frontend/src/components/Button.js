import React from 'react';
import styled from 'styled-components'

const Btn = styled.button`
  padding: 5px;
  background: ${props => props.disable? 'none;': 'var(--secundary-color);'}
  box-shadow: ${props => props.disable? 'none;' :'2px 2px 2px 1px rgba(0, 0, 0, 0.25);'}
  border: ${props => props.disable? '2px solid var(--secundary-color);': 'none;'}
  color: ${props => props.disable? 'var(--secundary-color);': 'var(--white);'}
  cursor: ${props => props.disable? 'none;': 'pointer;'}
  border-radius: 5px 5px;
`

const Button = (props) => (
  <Btn onClick={props.func} disable={props.disable} >
    {props.text}
  </Btn>
)

export default Button;