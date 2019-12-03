import {
    GET_LINEUP_MEMBERS,
    ADD_TO_LINEUP,
    DELETE_FROM_LINEUP,
} from '../constants/actionType';

const defaultState = {
    lineupMembers: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_LINEUP_MEMBERS:
            return {
                ...state,
                lineupMembers: action.error ? [] : action.payload.Members
            };
        case ADD_TO_LINEUP:
            return {
                ...state,
                lineupMembers: action.error ? state.lineupMembers : [...state.lineupMembers, action.payload.radarItem]
            };
        case DELETE_FROM_LINEUP:
            return {
                ...state,
                lineupMembers: action.error ? state.lineupMembers : state.lineupMembers.filter(item => {
                    return item.spotify_id !== action.id
                })
            }
        default:
            return state;
    }
};
