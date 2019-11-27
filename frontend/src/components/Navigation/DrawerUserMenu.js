import React from 'react';
import {Link } from "react-router-dom";
import styled from 'styled-components'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Wrapper = styled.div`
  padding: 20px 0;
`
const Avatar = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`
const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px 0;
  margin-right: 10px
  border-radius: 50%
`
const Options = styled.div`
  display:flex;
  justify-content: space-between;
`
const Item = styled(Link)`
  margin: 10px 0;
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  text-decoration: none;
  color: var(--white);

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

const DrawerUserMenu = (props) => {

  if(props.currentUser){
    return (
      <Wrapper> 
        <Avatar>
          <ProfilePic 
            src="https://www.library.caltech.edu/sites/default/files/styles/headshot/public/default_images/user.png" 
            alt="profile pic"
          />
          <p>{props.currentUser.username}</p>      
        </Avatar>
        <Options>
          <Item><SettingsApplicationsIcon/>Settings</Item>
          <Item onClick={props.logout}><ExitToAppIcon/>Logout</Item>      
        </Options>
      </Wrapper>
    )    
  }else {
    return (
      <Wrapper> 
        <Options>
          <Item to='/register'><ExitToAppIcon/>Sign Up</Item>      
          <Item to='/login'><ExitToAppIcon/>Login</Item>      
        </Options>
      </Wrapper>
    )
  }
}

export default DrawerUserMenu;
