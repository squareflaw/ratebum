import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import styled from 'styled-components'
import { connect } from 'react-redux'
import agent from '../../agent'

import {
    CHANGE_ORDER,
    GET_RADAR_ITEMS
} from '../../constants/actionType'


const MainContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
const Wrapper = styled.div`
`

function OrderSwitch(props) {

    const handleChange = name => event => {
        if (props.order === 'new') {
            props.changeOrder('old')
            const payload = agent.radar.items(1, 'old')
            props.getItems(payload)
        }else{
            props.changeOrder('new')
            const payload = agent.radar.items(1, 'new')
            props.getItems(payload)
        }
    };

    return (
        <MainContainer>
            <Wrapper>
                <FormControlLabel
                    control={
                        <Switch checked={props.order === 'new'} onChange={handleChange()}/>
                    }
                    color='#fff'
                />
                <p>Recent first</p>
            </Wrapper>
        </MainContainer>
    );
}


const mapStateToProps = (state) => ({
    order: state.radar.order,
})

const mapDispatchToProps = dispatch => ({
    changeOrder: order => dispatch({ type: CHANGE_ORDER, order }),
    getItems: payload  => dispatch({ type: GET_RADAR_ITEMS, payload }),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderSwitch)

