import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const Title = styled.h6`
  font-family: var(--primary-font);
  font-weight: lighter;
  font-size: 1.5rem;
  text-align: center;
  flex-grow: 1;
`

const Logo = styled.img`
    width: 40px;
    height: 40px;
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
