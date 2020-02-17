import { applyMiddleware, createStore } from 'redux'
// import { createLogger } from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { promiseMiddleware, localStorageMiddleware } from "./middleware";
import createRootReducer from './reducer'

export const history = createBrowserHistory() 

export const store = createStore(
  createRootReducer(history),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      promiseMiddleware,
      localStorageMiddleware
      // ,createLogger()
    )
  ),
);
