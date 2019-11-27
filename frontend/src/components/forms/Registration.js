
import {isEmail, isLength} from 'validator' 

import React, {Component} from 'react';
import { connect } from 'react-redux'

import agent from "../../agent";
import { REGISTER,CLEAN_ERRORS} from '../../constants/actionType'
import RegistrationView from './RegistrationView'

const mapStateToProps = (state) => ({
  inProgress: state.auth.inProgress,
  errors: state.auth.errors,
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (username, email, password) => {
    const payload = agent.auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
  cleanErrors:()=> dispatch({type:CLEAN_ERRORS}),
}); 

class Registration extends Component {
  state = {
    username:'',
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
    const {username, email, password} = this.state
    this.props.onSubmit(username, email, password)
  }

  validateFields = fields => {    
    // Validate for any non white-space characters
    if(!/\S+/.test(fields.username)){
      this.setState({
        ...this.state,
        errorMessage: "Missing username",
        errorItem:'username'
      });
      return false;
    }

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
      if(nextProps.errors.email || nextProps.errors.username){
        this.setState({
          ...this.state,
          errorMessage: 'Authentication error: Email or username may already exist',
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
        <RegistrationView
            handleSubmit={this.handleSubmit}
            onChange={this.onChange}
            valueUsername={this.state.username}
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration);