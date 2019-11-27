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

// function HideOnScroll(props) {
//   const { children, window } = props;
//   // const trigger = useScrollTrigger({ target: window ? window() : undefined });

//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       {children}
//     </Slide>
//   );
// }

const Header = (props) => {
  const { classes } = props;

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
          <Title>
            {props.currentPageTitle}
          </Title>
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
