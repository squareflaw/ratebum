import React from 'react';
import styled from 'styled-components'
import { Link } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const AddButton = styled(Fab)`
  width: 60px;
  min-width: 60px;
  height: 60px;
  right: 2rem;
  bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: var(--secundary-color);
  color: var(--full-white);
  border: none;
  border-radius: 50px;
  font-size: 1rem;
`

const PrimaryButton = ({url}) => {
    return (
        <AddButton
            color="primary"
            aria-label="add"
            as={Link}
            to={url}
        >
            <AddIcon />
        </AddButton>
    )
}

export default PrimaryButton
