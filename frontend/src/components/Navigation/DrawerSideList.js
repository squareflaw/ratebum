import React from 'react';
import {Link } from "react-router-dom";
import styled from 'styled-components'

const List = styled.ul`
  padding: 20px 0;
  border-bottom: 3px solid var(--primary-color);
`
const Item = styled.li`
  display: flex;
  align-items: center;
  max-width: 150px;
`
const Section = styled(Link)`
  margin: 10px;
  color: var(--white);
  font-size: 1.4rem;
  text-decoration: none;

`



const SideList = (props) => (
  <List>
    {props.options.map((section, index) => (
      <Item key={section.text}>     
        <Section to={section.link}>{section.text}</Section>
      </Item>
    ))}
  </List>
);

export default SideList;