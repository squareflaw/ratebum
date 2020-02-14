import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from "react-router-dom";
import { push } from 'connected-react-router'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { store } from '../store';
import { APP_LOAD, REDIRECT} from '../constants/actionType'
import agent from '../agent'

import Navigation from './Navigation/'
import Radar from './Radar/'
import SearchComponent from './SearchComponent/'
import Login from './forms/Login' 
import Registration from './forms/Registration' 
import CenterCircularProgress from './CenterCircularProgress'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#205080',
    },
    secondary: {
      light: '#00cccc',
      main: '#208080',
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});


const mapStateToProps = (state) => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token}), 
  onRedirect: () =>
    dispatch({ type: REDIRECT }),
});

export class App extends Component {

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentDidMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token); 
    }

    this.props.onLoad(token ? agent.auth.current() : null, token);

    if (!token) store.dispatch(push('/register')) 
  }


  render() {

    if (!this.props.appLoaded) return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Navigation/>
          <CenterCircularProgress/>
        </MuiThemeProvider>
      </div>
    )

    return (
      <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <Navigation/>
        <Switch>         
          <Route exact path="/" component={Radar} />         
          <Route path="/search" component={SearchComponent} />         
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Registration}/>
        </Switch> 
      </MuiThemeProvider>
      </React.Fragment>
    ) 
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
