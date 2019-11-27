import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import styled from 'styled-components'

import DrawerSideList from './DrawerSideList'
import DrawerUserMenu from './DrawerUserMenu'

const MainDiv = styled.div`
  height: 100vh;
  width: 70vw;
  max-width: 280px;
  padding: 20px;
  background: var(--primary-dark-color);
  color: var(--white);
`


const Drawer = (props) => {
  return (
    <SwipeableDrawer
      open={props.isDrawerOpen}
      onClose={props.closeDrawer}
      onOpen={props.openDrawer}
    >
      <MainDiv
        tabIndex={0}
        role="button"
        onClick={props.closeDrawer}
        onKeyDown={props.closeDrawer}
      >
        <DrawerSideList  options={props.options}/>
        <DrawerUserMenu 
          currentUser={props.currentUser}
          logout={props.logout}
        />
      </MainDiv>
    </SwipeableDrawer>
  );
}

export default Drawer;
