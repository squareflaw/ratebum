
import {isEmail, isLength} from 'validator' 

import React, {Component} from 'react';
import { connect } from 'react-redux'

import agent from "../../agent";
import { LOGIN,CLEAN_ERRORS} from '../../constants/actionType'
import LoginView from './LoginView'

const mapStateToProps = (state) => ({
  inProgress: state.auth.inProgress,
  errors: state.auth.errors,
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password) => {
    const payload = agent.auth.login(email, password);
    dispatch({ type: LOGIN, payload })
  },
  cleanErrors:()=> dispatch({type:CLEAN_ERRORS}),
}); 

class Login extends Component {
  state = {
    email:'', 
    password:'',
    showPassword:false,
    errorMessage:'',
    errorItem:null
  }  

  onChange = e => {
    let state = this.state;
    state[e.target.id] = e.target.value
    state.errorMessage = ''
    state.errorItem = null
    this.setState(state);

    if(this.props.errors){
      this.props.cleanErrors()      
    }

  }

  handleSubmit = e => {
    e.preventDefault()
    if(!this.validateFields(this.state)){
      return
    }
    const {email, password} = this.state
    this.props.onSubmit(email, password)
  }

  validateFields = fields => {

    if(!isEmail(fields.email)){
      this.setState({
        ...this.state,
        errorMessage: "Invalid Email",
        errorItem:'email'
      });
      return false;
    }

    if(!isLength(fields.password, {min:8, max: undefined})){
      this.setState({
        ...this.state,
        errorMessage: "Password should be at leats 8 characters long",
        errorItem: 'password'
      });
      return false;
    }

    this.setState({
        ...this.state,
        errorMessage: '',
        errorItem:null
      });
    return true
  }

  handleClickShowPassword = () => {
    this.setState({...this.state, showPassword: !this.state.showPassword});
  };

  componentWillReceiveProps(nextProps){
    if (nextProps.errors) {
      if(nextProps.errors.email){
        this.setState({
          ...this.state,
          errorMessage: 'Authentication error: Email is not registered',
          errorItem:null
        });
      }else {
        this.setState({
          ...this.state,
          errorMessage: 'Server Error: try again later',
          errorItem:null
        });  
      }
    }
  }

  render() {
    return (
        <LoginView
            handleSubmit={this.handleSubmit}
            onChange={this.onChange}
            valueEmail={this.state.email}
            valuePassword={this.state.password}
            showPassword={this.state.showPassword}
            handleClickShowPassword={this.handleClickShowPassword}
            inProgress={this.props.inProgress}
            errorItem={this.state.errorItem}
            errorMessage={this.state.errorMessage}
        />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);