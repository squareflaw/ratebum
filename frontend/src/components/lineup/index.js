import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
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
import PrimaryButton from '../PrimaryButton'


const MainDiv = styled.div`
  min-height:   100vh;
  background:   var(--primary-color);
`
export class Lineup extends Component {
    state = {
        order: 'newest'
    }

    componentDidMount() {
        if (!this.props.currentUser) {
            store.dispatch(push('/register'))
        }
    }

    UNSAFE_componentWillMount() {        
        this.props.changePageTitle('Lineup')
        const payload = agent.lineup.members(this.state.order)
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
                <PrimaryButton url="/search"/>
            </MainDiv>
        )
    }
}

const mapStateToProps = (state) => ({
    inProgress: state.common.inProgress,
    currentUser: state.common.currentUser,
    currentPageTitle: state.common.currentPageTitle,
    lineupMembers: state.lineup.lineupMembers,
})

const mapDispatchToProps = (dispatch) => ({
    getMembers: payload => dispatch({type: GET_LINEUP_MEMBERS, payload}),
    deleteMember: (id, payload) => dispatch({type: DELETE_FROM_LINEUP, id, payload}),
    changePageTitle: pageTitle => dispatch({type: CHANGE_PAGE_TITLE, pageTitle})
})

export default connect(mapStateToProps, mapDispatchToProps)(Lineup )
