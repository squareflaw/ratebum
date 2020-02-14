import React from 'react';
import styled from 'styled-components'

const StyledSelect = styled.select`
  padding: 5px;
  background: var(--primary-dark-color);
  color: var(--white);
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);
  align-self: flex-end;
`

const OrderingSelector = (props) => (
  <StyledSelect name="select">
    <option value="old" defaultValue>Queue</option> 
    <option value="new">Recent</option>
  </StyledSelect>
);

export default OrderingSelector;