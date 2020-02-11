import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from 'styled-components'
// import Button from './Button'
import Menu from './Menu'

import agent from "../../agent";
import {
  DELETE_FROM_RADAR,
} from "../../constants/actionType";

const StyledMenu = styled(Menu)`
  cursor: pointer;
`

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  deleteItem: (payload, id) => dispatch({ type: DELETE_FROM_RADAR, payload, id }),
});

class ItemButton extends Component {

  handleDeleteItem = id => {
    const payload = agent.radar.delete(id);
    this.props.deleteItem(payload, this.props.id);
  };

  render() {
    const spotify_id = this.props.id
    return (
      <StyledMenu deleteItem={() => this.handleDeleteItem(spotify_id)} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemButton);