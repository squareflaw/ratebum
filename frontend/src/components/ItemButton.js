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
} from "../constants/actionType";

const StyledMenu = styled(Menu)`
  cursor: pointer;
`

const mapStateToProps = state => ({
  inProgress: state.common.inProgress,
  searchResults: state.music.searchResults,
  radarItems: state.radar.radarItems,
});

const mapDispatchToProps = dispatch => ({
  onSearch: payload => dispatch({ type: SEARCH, payload }),
  addItem: payload => dispatch({ type: ADD_TO_RADAR, payload }),
  deleteItem: payload => dispatch({ type: DELETE_FROM_RADAR, payload }),
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

  render() {
    const spotify_id = this.props.id
    const itemType = this.props.itemType
    return (
      <StyledMenu
        addItem={() => this.handleAddItem(spotify_id, itemType)}
        deleteItem={() => this.handleDeleteItem(spotify_id)}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemButton);