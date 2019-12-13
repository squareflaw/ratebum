import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from 'styled-components'
// import Button from './Button'
import Menu from './Menu'

import agent from "../agent";
import {
  SEARCH,
  ADD_TO_RADAR,
  DELETE_FROM_RADAR,
  ADD_TO_LINEUP,
  DELETE_FROM_LINEUP
} from "../constants/actionType";

const StyledMenu = styled(Menu)`
  cursor: pointer;
`

const mapStateToProps = state => ({
  inProgress: state.common.inProgress,
  searchResults: state.music.searchResults,
  radarItems: state.radar.radarItems,
  lineupMembers: state.lineup.lineupMembers
});

const mapDispatchToProps = dispatch => ({
  onSearch: payload => dispatch({ type: SEARCH, payload }),
  addItem: payload => dispatch({ type: ADD_TO_RADAR, payload }),
  deleteItem: payload => dispatch({ type: DELETE_FROM_RADAR, payload }),
  addLineupMember: payload => dispatch({ type: ADD_TO_LINEUP, payload }),
  deleteLineupMember: payload => dispatch({ type: DELETE_FROM_LINEUP, payload })
});

class ItemButton extends Component {

  state = {
    itemOnProgressId: null,
  }

  handleAddItem = (id, itemType) => {
    const payload = agent.radar.add(id, itemType);
    this.props.addItem(payload);
  };
  handleDeleteItem = id => {
    const payload = agent.radar.delete(id);
    
    this.props.deleteItem(payload);
  };
  handleAddLineupMember = id => {
    const payload = agent.lineup.add(id);
    this.props.addLineupMember(payload);
  };
  handleDeleteLineupMember = id => {
    const payload = agent.lineup.delete(id);
    this.props.deleteLineupMember(payload);
  };

  render() {
    const spotify_id = this.props.id
    const itemType = this.props.itemType
    return (
      <StyledMenu
        addItem={() => this.handleAddItem(spotify_id, itemType)}
        deleteItem={() => this.handleDeleteItem(spotify_id)}
        addLineupMember={() => this.handleAddLineupMember(spotify_id)}
        deleteLineupMember={() => this.handleDeleteLineupMember(spotify_id)}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemButton);