import React from 'react';
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';

const CenterDiv = styled.div`
  min-height:  ${props => props.small? '0;' : '100vh;'};
  display: flex;
  justify-content: center;
  align-items:  ${props => props.small ? 'flex-start;' : 'center;'};
`

const Progress = styled(CircularProgress)`
  color: var(--secundary-light-color);
`

const CenterCircularProgress = (props) => (
  <CenterDiv small={props.small}> 
    <Progress color='inherit'/>
  </CenterDiv>
);

export default CenterCircularProgress;