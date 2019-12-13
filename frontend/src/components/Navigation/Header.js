import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';
// import Slide from '@material-ui/core/Slide';
import SearchIcon from '@material-ui/icons/Search'; 


const HeaderBar = styled(AppBar)`
  color: #fff;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  width: 100%;
`

const Title = styled.h6`
  font-family: var(--primary-font);
  font-weight: lighter;
  font-size: 1.5rem;
  text-align: center;
  flex-grow: 1;
`

const SearchIconStyled = styled(SearchIcon)`
  color: #fff;
  margin-left: 32px;
`

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  moveToRight:{
    float: 'right'
  }
};

const Header = (props) => {
  const { classes } = props;

  let titleLink;

  if(props.currentPageTitle === 'Home') titleLink = '/'
  if(props.currentPageTitle === 'Lineup') titleLink = '/lineup'
  if(props.currentPageTitle === 'Radar') titleLink = '/radar'

  return (
    // <HideOnScroll>
      <HeaderBar position='static' color="primary">
        <Toolbar>
          <IconButton 
            className={classes.menuButton} 
            aria-label="Menu"
            color='inherit'
            onClick={props.openDrawer}
          >
            <MenuIcon/>
          </IconButton>
          <StyledLink to={titleLink}>
            <Title>
              {props.currentPageTitle}
            </Title>
          </StyledLink>
          
          <Link to='/search'>
            <SearchIconStyled/>
          </Link>
        </Toolbar>
      </HeaderBar>
    // </HideOnScroll>
  );
  }


Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
