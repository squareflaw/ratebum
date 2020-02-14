import React, {Component} from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import { push } from 'connected-react-router'

import CenterCircularProgress from '../CenterCircularProgress'

import { store } from '../../store';
import NextOnRadar from './NextOnRadar'
import RadarList from './RadarList'
import agent from '../../agent'
import { 
  GET_RADAR_ITEMS, 
  DELETE_FROM_RADAR,
  CHANGE_PAGE_TITLE
} from '../../constants/actionType'
import PrimaryButton from '../PrimaryButton';
import { CircularProgress } from '@material-ui/core';

const mapStateToProps = (state) => ({
  inProgress: state.common.inProgress,
  currentUser: state.common.currentUser,
  radarItems: state.radar.radarItems,
  totalCount: state.radar.totalCount,
  page: state.radar.page,
})

const mapDispatchToProps = dispatch => ({
  getItems: payload =>
   dispatch({ type: GET_RADAR_ITEMS, payload}),
  deleteItem: (id, payload) =>
   dispatch({ type: DELETE_FROM_RADAR, id, payload}),
});


const MainDiv = styled.div`
  min-height: 100vh;
  background: var(--primary-color);
`

const CircularAlignCenterProgress = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

class Radar extends Component {

  componentDidMount(){
    if (!this.props.currentUser) {
      store.dispatch(push('/register'))
      window.localStorage.setItem('jwt','')
      agent.setToken('')
    }

    if (this.props.page === 1) {
      const payload = agent.radar.items(this.props.page)
      this.props.getItems(payload)   
    }
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  
  handleScroll = e => {
    const bottom = e.target.scrollingElement.scrollHeight - e.target.scrollingElement.scrollTop === e.target.scrollingElement.clientHeight
    if (bottom && this.props.totalCount+20 > this.props.page*20) {
      const payload = agent.radar.items(this.props.page)
      this.props.getItems(payload)
    }
  }

  handleDeleteItem = id => {
    const payload = agent.radar.delete(id)
    this.props.deleteItem(id, payload)
  }

  render() {
    if(this.props.inProgress && !this.props.radarItems) {
      return <CenterCircularProgress/>

    }else if(!this.props.radarItems[0]){
      return <h5>No items in radar</h5>
    }

    return (
      <MainDiv onScroll={this.handleScroll}>
        <NextOnRadar 
          item={this.props.radarItems? this.props.radarItems[0] : {}}
          itemsCount={this.props.totalCount}
          deleteItem={this.handleDeleteItem}
        />
        <RadarList 
          items={this.props.radarItems? this.props.radarItems.slice(1) : []}
          deleteItem={this.handleDeleteItem}
        />
        {this.props.inProgress? (
            <CenterCircularProgress small/>
          ):null
        }
        <PrimaryButton url="/search" />
      </MainDiv>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radar);