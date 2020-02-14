import {
    GET_RADAR_ITEMS,
    ADD_TO_RADAR,
    DELETE_FROM_RADAR,
    CHANGE_ORDER,
    LOGOUT,
} from '../constants/actionType';

const defaultState = {
    radarItems: [],
    page: 1,
    order: 'old',
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_RADAR_ITEMS:
            return {
                ...state,
                radarItems: action.error? state.radarItems : state.radarItems.concat(action.payload.radarItems),
                totalCount: action.error? 0 : action.payload.totalCount,
                page: state.page + 1,
            };
        case CHANGE_ORDER:
            return {
                ...state,
                order: action.order,
                radarItems: [],
                page: 1
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
        case LOGOUT:
            return { ...state, radarItems: [], page: 1};
        default:
            return state;
    }
};
