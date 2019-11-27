import React, {Component} from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
// import { push } from 'connected-react-router'
// import { store } from '../../store';
// import CenterCircularProgress from '../CenterCircularProgress';

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
  inProgress: state.common.inProgress,
})

const mapDispatchToProps = dispatch => ({
  // onLoad: (payload, token) =>
  //  dispatch({ type: APP_LOAD, payload, token}), 
});

class Home extends Component {

  render() {
    if(this.props.currentUser) {
      return (
        <MainDiv>
          <Message> 
            Signed in as {this.props.currentUser.username}
          </Message> 
        </MainDiv>
      )
    }
    return (
      <MainDiv>
        <Message> 
          Welcome to {this.props.appName}
        </Message> 
      </MainDiv>      
  )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);