import React, { useEffect, useRef, useState } from 'react';
import Router from "next/router";
import { submitHandler } from './SignUp.api';
import { logout } from '../../../utils/auth';
import { useStyles } from './SignUp.style';
import { Button, Card, Container, Paper, Grid, Typography, CardContent, TextField } from '@material-ui/core';
    

const SignUp = props => {
  const [errorState, setErrorState] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const inputEmail = useRef('');
  const inputPassworrd = useRef('');
  const classes = useStyles();
  
 
  
  const inputOnChnage = () => {
    const email = inputEmail.current.value;
    const password = inputPassworrd.current.value
    if (email.trim().length !== 0 || password.trim().length !== 0) {
      setErrorState(false)
    }
  }
  
  const switchModeHandler = () => {
    setIsLogin(!isLogin)
    setErrorState(false)
  }

    return ( 
       <Container className={classes.root}>
         <Card>
          <CardContent>
             <Typography color="textSecondary" gutterBottom className={classes.title}>
              Sign Up
            </Typography>
            <form noValidate autoComplete="off" onSubmit={(e) => submitHandler(e, inputEmail, inputPassworrd, isLogin, setErrorState)}>
              <div>
                <TextField
                  error={errorState}
                  inputRef={inputEmail} 
                  id="outlined-full-width"
                  label="Email"
                  placeholder="test@test.com"
                  helperText={errorState ? "erorr message" : ''}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={inputOnChnage}
                />
                <TextField 
                  error={errorState}
                  inputRef={inputPassworrd} 
                  id="outlined-full-width"
                  label="Password" 
                  margin="normal"
                  fullWidth
                  variant="outlined" 
                  helperText={errorState ? "erorr message" : ''}
                />
                <Button type="submit" color="primary">Submit</Button>
                <Button color="primary" onClick={switchModeHandler}>
                  Switch to {isLogin ? 'Signup' : 'Login'}
                </Button>
              </div>
              <Button color="primary" onClick={logout}>loggout</Button>
            </form>
          </CardContent>
         </Card>
      </Container>
     )
 }
 
export default SignUp;