import { 
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  LOGIN,
  REGISTER,
  ASYNC_START,
  ASYNC_END,
  CHANGE_PAGE_TITLE,
} from '../constants/actionType'


const defaultState = {
  appName: 'Ratebum',
  currentPageTitle: 'Ratebum',
  currentUser: null,
  sideBarOptions: [
    {text:'Home', link: '/'},
    {text:'Radar', link: '/radar'},
    {text:'Albums', link: '#'},
    {text:'Following', link: '#'},
  ]
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : {},
        msg: action.msg,
      };
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
    case LOGOUT:
      return { ...state, redirectTo: '/register', token: null, currentUser: null };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case CHANGE_PAGE_TITLE:
      return { ...state, currentPageTitle: action.pageTitle };
    case ASYNC_START:
      return { ...state, inProgress: true };
    case ASYNC_END:
      return { ...state, inProgress: false };

    default:
      return state;
  }
}