import {
  SEARCH,
} from '../constants/actionType'; 

export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        inProgress: false,
        searchResults: action.error ? null : action.payload.searchResults
      };
    default:
      return state; 
  }
};
