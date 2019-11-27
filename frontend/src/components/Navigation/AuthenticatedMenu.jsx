import React from 'react'

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const AuthenticatedMenu = (props) => (
  <div>
    <IconButton
      aria-owns={props.open ? 'menu-appbar' : undefined}
      aria-haspopup="true"
      onClick={props.handleMenu}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={props.open}
      onClose={props.handleClose}
    >
      <MenuItem onClick={props.handleClose}>Profile</MenuItem>
      <MenuItem onClick={props.handleClose}>Settings</MenuItem>
      <MenuItem onClick={()=> {
        props.LogOut()
        props.handleClose()
      }}>Logout</MenuItem>
    </Menu>
  </div>
);

export default AuthenticatedMenu;
