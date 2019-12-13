import {
    GET_RADAR_ITEMS,
    ADD_TO_RADAR,
    DELETE_FROM_RADAR,
} from '../constants/actionType';

const defaultState = {
    radarItems: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_RADAR_ITEMS:
            return {
                ...state,
                radarItems: action.error ? [] : action.payload.radarItems
            };
        case ADD_TO_RADAR:
            return {
                ...state,
                radarItems: action.error ? state.radarItems : [...state.radarItems, action.payload.radarItem]
            };
        case DELETE_FROM_RADAR:
            return {
              ...state,
              radarItems: action.error? 
                    state.radarItems
                : 
                    state.radarItems.filter(item => {
                        return item.spotify_id !== action.id;
                    })
            };
        default:
            return state;
    }
};
