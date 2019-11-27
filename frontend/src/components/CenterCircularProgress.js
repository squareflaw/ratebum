import React from 'react';
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress';

const CenterDiv = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Progress = styled(CircularProgress)`
  color: var(--secundary-light-color);
`

const CenterCircularProgress = (props) => (
  <CenterDiv> 
    <Progress color='inherit'/>
  </CenterDiv>
);

export default CenterCircularProgress;