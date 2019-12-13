import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components'

const StyledLink = styled(Link)`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  background: var(--primary-color);
  color: #fff;
  border-bottom: 3px solid var(--primary-color);
  border-radius: 5px;
  text-decoration: none;
`
const Title = styled.h6`
  font-family: var(--primary-font);
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  flex-grow: 1;
`

const Logo = styled.img`
    width: 30px;
    height: 30px;
    margin-left: 10px;
`

const AppName = ({appName}) => {
    return (
        <StyledLink to="/">
            <Logo src="logo.svg"/>
            <Title>
                {appName}
            </Title>
        </StyledLink>
    )
}

export default AppName
