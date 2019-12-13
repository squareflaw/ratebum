import React, {Component} from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { push } from 'connected-react-router'

import {
  // GET_ITEMS,
  CHANGE_PAGE_TITLE
} from '../../constants/actionType'

// import agent from '../../agent'
import { store } from '../../store';
import CenterCircularProgress from '../CenterCircularProgress';
import Radar from '../Radar';
import { Lineup } from '../Lineup';



const MainDiv = styled.div`
  padding: 20px;
`

const Message = styled.p`
  font-size: 1.5rem;
  text-align: center;  
`

const mapStateToProps = (state) => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
})

const mapDispatchToProps = dispatch => ({
  changePageTitle: pageTitle => 
    dispatch({ type: CHANGE_PAGE_TITLE, pageTitle }) 
});

class Home extends Component {

  componentDidMount() {
    if (!this.props.currentUser) {
      store.dispatch(push('/register'))
    }
    this.props.changePageTitle('Home')
  }

  render() {
    console.log(this.props.currentUser)
    if(!this.props.appLoaded) {
      return <CenterCircularProgress/>
    }
    if(!this.props.currentUser) {
      return (
        <MainDiv>
          <Message>
            Welcome to {this.props.appName}
          </Message>
        </MainDiv>
      )
    }

    return (
      <MainDiv>
        <h3>Welcome {this.props.currentUser.username}</h3>
      </MainDiv>
    )
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);