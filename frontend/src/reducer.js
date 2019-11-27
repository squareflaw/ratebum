import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import common from './reducers/common'
import auth from './reducers/auth'
import music from './reducers/music'

export default (history) => combineReducers({
  common,
  auth,
  music,
  router: connectRouter(history),  
})