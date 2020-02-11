import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import common from './reducers/common'
import auth from './reducers/auth'
import music from './reducers/music'
import radar from './reducers/radar'

export default (history) => combineReducers({
  common,
  auth,
  music,
  radar,
  router: connectRouter(history),   
})