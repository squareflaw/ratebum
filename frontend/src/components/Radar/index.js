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

const mapStateToProps = (state) => ({
  inProgress: state.common.inProgress,
  currentUser: state.common.currentUser,
  currentPageTitle: state.common.currentPageTitle,
  radarItems: state.radar.radarItems,
})

const mapDispatchToProps = dispatch => ({
  getItems: payload =>
   dispatch({ type: GET_RADAR_ITEMS, payload}),
  deleteItem: (id, payload) =>
   dispatch({ type: DELETE_FROM_RADAR, id, payload}),
  changePageTitle: pageTitle => dispatch({type: CHANGE_PAGE_TITLE, pageTitle})
});


const MainDiv = styled.div`
  min-height: 100vh;
  background: var(--primary-color);
`

class Radar extends Component {
  componentDidMount(){
    if (!this.props.currentUser) {
      store.dispatch(push('/register'))
    }
    const payload = agent.radar.items()
    this.props.changePageTitle('Radar')
    this.props.getItems(payload)
  }

  handleDeleteItem = id =>{
    const payload = agent.radar.delete(id)
    this.props.deleteItem(id, payload)
  }

  render() {
    const radarItems = this.props.radarItems

    if(this.props.inProgress) {
      return <CenterCircularProgress/>

    }else if(!radarItems){
      return <h5>No items in radar</h5>
    }

    return (
      <MainDiv>
        <NextOnRadar 
          item={radarItems? radarItems[0] : {}}
          deleteItem={this.handleDeleteItem}
        />
        <RadarList 
          items={radarItems? radarItems.slice(1) : []}
          deleteItem={this.handleDeleteItem}
        />
        <PrimaryButton url="/search" />
      </MainDiv>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radar);