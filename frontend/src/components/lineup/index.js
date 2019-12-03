import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { push } from 'connected-react-router'
import CenterCircularProgress from '../CenterCircularProgress'

import { store } from '../../store';
import agent from '../../agent'

import LineupList from './LineupList'

import {
    GET_LINEUP_MEMBERS,
    DELETE_FROM_LINEUP,
    CHANGE_PAGE_TITLE,
} from '../../constants/actionType'


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

export class Lineup extends Component {
    state = {
        order: 'newest'
    }

    componentDidMount() {
        if (!this.props.currentUser) {
            store.dispatch(push('/register'))
        }
        const payload = agent.lineup.members(this.state.order)
        this.props.changePageTitle('Lineup')
        this.props.getMembers(payload)
    }

    handleDeleteMember = id =>{
        const payload = agent.lineup.delete(id)
        this.props.deleteMember(id, payload)
    }
    

    render() {
        const lineupMembers = this.props.lineupMembers

        if(this.props.inProgress) {
            return <CenterCircularProgress/>

        }else if(!lineupMembers){
            return <h5>No items in radar</h5>
        }

        return (
            <MainDiv>
                {/* <NextOnRadar 
                item={lineupMembers? lineupMembers[0] : {}}
                deleteItem={this.handleDeleteMember}
                /> */}
                <LineupList 
                    members={lineupMembers? lineupMembers.slice(0) : []}
                    deleteItem={this.handleDeleteMember}
                />
                <Link to='/search'>
                    <AddButton>+</AddButton>
                </Link>
            </MainDiv>
        )
    }
}

const mapStateToProps = (state) => ({
    inProgress: state.common.inProgress,
    currentUser: state.common.currentUser,
    lineupMembers: state.lineup.lineupMembers,
})

const mapDispatchToProps = (dispatch) => ({
    getMembers: payload => dispatch({type: GET_LINEUP_MEMBERS, payload}),
    deleteMember: (id, payload) => dispatch({type: DELETE_FROM_LINEUP, id, payload}),
    changePageTitle: pageTitle => dispatch({type: CHANGE_PAGE_TITLE, pageTitle})
})

export default connect(mapStateToProps, mapDispatchToProps)(Lineup )
