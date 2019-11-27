import React, {Component} from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import {Link } from "react-router-dom";

import CenterCircularProgress from '../CenterCircularProgress'

import NextOnRadar from './NextOnRadar'
import RadarList from './RadarList'
import agent from '../../agent'
import { GET_RADAR_ITEMS, DELETE_FROM_RADAR} from '../../constants/actionType'

const mapStateToProps = (state) => ({
  inProgress: state.common.inProgress,
  radarItems: state.music.radarItems
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
const AddButton = styled.button`
  width: 60px;
  min-width: 60px;
  height: 60px;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  background: var(--secundary-color);
  border: none;
  border-radius: 50px;
  color: var(--full-white);
  font-size: 3rem;
`

class Radar extends Component {

  componentDidMount(){
    const payload = agent.radar.items()
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
        <Link to='/search'>
          <AddButton>+</AddButton>
        </Link>
      </MainDiv>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radar);