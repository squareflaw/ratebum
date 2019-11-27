import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import CenterCircularProgress from '../CenterCircularProgress';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  }, 
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function LoginView(props) {
  const { classes } = props;

  
  const ErrorMessage = props.errorMessage? (
    <Typography style={{color:'red'}} className={classes.submit}>
      {props.errorMessage}
    </Typography>
  ): null

  if(props.inProgress) return (
    <CenterCircularProgress className={classes.progress} />
  )

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={props.handleSubmit}>
          <FormControl 
            margin="normal" 
            required 
            fullWidth
            error={props.errorItem==='email'}
          >
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input 
              id="email" 
              name="email" 
              autoComplete="email" 
              value={props.valueEmail}
              onChange={props.onChange}
            />
          </FormControl>
          <FormControl 
            margin="normal" 
            required 
            fullWidth
            error={props.errorItem==='password'}
          >
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="password"
              type={props.showPassword ? 'text' : 'password'}
              value={props.valuePassword}
              onChange={props.onChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton 
                    aria-label="Toggle password visibility" 
                    onClick={props.handleClickShowPassword}
                  >
                    {props.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={props.handleSubmit}

          >
            Login
          </Button>
          {ErrorMessage}
          <Typography className={classes.submit}>
              Don't have an account? <Link to='/register'>sign up</Link>
          </Typography>
        </form>
      </Paper>
    </main>
  );
}

LoginView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginView);