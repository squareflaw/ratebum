import React, {Component} from 'react';
import { connect } from 'react-redux'
import Header from './Header'
import Drawer from './Drawer'
import {LOGOUT} from '../../constants/actionType'

const mapStateToProps = (state) => ({ 
  currentPageTitle: state.common.currentPageTitle,
  currentUser: state.common.currentUser,
  options: state.common.sideBarOptions,
  // location: state.router.location.pathname
})

const mapDispatchToProps = dispatch => ({
  onLogOut: () =>
    dispatch({type: LOGOUT}) 
});

class Navigation extends Component {
  state = {
    anchorEl: null,
    isDrawerOpen: false 
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  openDrawer = () => this.setState({...this.state, isDrawerOpen: true});
  closeDrawer = () => this.setState({...this.state, isDrawerOpen: false});
  
  render() {
    return (
      <React.Fragment>
        <Header
          appName={this.props.appName}
          currentPageTitle={this.props.currentPageTitle}
          currentUser={this.props.currentUser}
          handleMenu={this.handleMenu}
          handleClose={this.handleClose}
          openDrawer={this.openDrawer}
          anchorEl={this.state.anchorEl}
        />
        <Drawer
          isDrawerOpen={this.state.isDrawerOpen}
          openDrawer={this.openDrawer}
          closeDrawer={this.closeDrawer}
          options={this.props.options}
          currentUser={this.props.currentUser}
          logout={this.props.onLogOut}
        />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);