import {
  LOGIN,
  REGISTER,
  ASYNC_START,
  CLEAN_ERRORS,
} from '../constants/actionType'; 

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        inProgress: false,
        errors: action.payload && action.payload.errors ? action.payload.errors : null
      };
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return { ...state, inProgress: true };
      }
      break;
    case CLEAN_ERRORS:
      return {...state, errors: null}
    default:
      return state; 
  }

  return state;
};
