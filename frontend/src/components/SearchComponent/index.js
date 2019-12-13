import React, {Component} from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'

import Results from './Results'
import CenterCircularProgress from '../CenterCircularProgress'
import agent from '../../agent'
import { 
  SEARCH, 
} from '../../constants/actionType'

const mapStateToProps = (state) => ({
  inProgress: state.common.inProgress,
  searchResults: state.music.searchResults,
  radarItems: state.music.radarItems,
})

const mapDispatchToProps = dispatch => ({
  onSearch: payload =>
   dispatch({ type: SEARCH, payload}), 
});


const Form = styled.form`
  width: 100vw;
  min-height: 100vh;
  position: absolute;
  top: 0;
  background: var(--primary-dark-color);
`
const SearchInput = styled.input`
  background: var(--white);
  width: 100vw;
  height: 60px;
  padding-left: 2rem;
  border: none;
  font-size: 1.2rem;
  position: fixed;
`
class SearchComponent extends Component {
  _input: ?HTMLInputElement;

  state = {
    searchInput:'',
  }

  handleChange = e => {
    let state = this.state
    state[e.target.id] = e.target.value   
    this.setState(state)
  }

  handleSubmit = e => {
    e.preventDefault()
    let payload = agent.search(this.state.searchInput) 
    this.props.onSearch(payload)
  }

  componentDidUpdate(prevProps, prevState) {
    this._input.focus();
  }

  render() {
    const searchResults = this.props.searchResults
    const radarItems = this.props.radarItems
    const artists = searchResults? searchResults.artists.slice(0,3): null
    const albums = searchResults? searchResults.albums: null

    return (
      <Form onSubmit={e=> e.preventDefault()}>
        <SearchInput 
          autoFocus={true}
          ref={c => (this._input = c)}
          type='search' 
          placeholder='Search artists and albums'
          id='searchInput'
          value={this.state.searchInput}
          onChange={this.handleChange}
          onKeyDown={e => e.keyCode === 13? this.handleSubmit(e) : null}
        />
        {this.props.inProgress? (
            <CenterCircularProgress/>
          )
          :(
            <Results 
              artists={artists} 
              albums={albums} 
              radarItems={radarItems? radarItems : []}  
            />
          )
        }
      </Form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);