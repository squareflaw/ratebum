import React, {useState} from 'react';
import { connect } from 'react-redux'
import Header from './Header'
import Drawer from './Drawer'
import {LOGOUT} from '../../constants/actionType'

const mapStateToProps = state => ({ 
  appName: state.common.appName,
  currentPageTitle: state.common.currentPageTitle,
  currentUser: state.common.currentUser,
  options: state.common.sideBarOptions,
})

const mapDispatchToProps = dispatch => ({
  onLogOut: () =>
    dispatch({type: LOGOUT}) 
});

const Navigation = props => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenu = () => setAnchorEl(true);
  const handleClose = () => setAnchorEl(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <React.Fragment>
      <Header
        appName={props.appName}
        currentPageTitle={props.currentPageTitle}
        currentUser={props.currentUser}
        handleMenu={handleMenu}
        handleClose={handleClose}
        openDrawer={openDrawer}
        anchorEl={anchorEl}
      />
      <Drawer
        appName={props.appName}
        isDrawerOpen={isDrawerOpen}
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        options={props.options}
        currentUser={props.currentUser}
        logout={props.onLogOut}
      />
    </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);