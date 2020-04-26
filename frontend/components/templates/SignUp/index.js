import React, { useEffect, useRef, useState } from 'react';
import cookies from 'js-cookie';
import Router from "next/router";
import { logout } from '../../../utils/auth';
import { useStyles } from './SignUp.style';
import {API_DOMAIN} from '../../../env.json';
import { Button, Card, Container, Paper, Grid, Typography, CardContent, TextField } from '@material-ui/core';
    

const SignUp = props => {
  const [errorState, setErrorState] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const inputEmail = useRef('');
  const inputPassworrd = useRef('');
  const classes = useStyles();
  
  const submitHandler = event => {
    event.preventDefault();
    const email = inputEmail.current.value;
    const password = inputPassworrd.current.value

    if (email.trim().length === 0 || password.trim().length === 0) {
      setErrorState(true)
      return;
    }
    
    let requestBody = {
      query: `
        query {
          login(username: "${email}", password: "${password}") {
            userId
          }
        }
      `
    };
    
    if (!isLogin) {
      const requestBody = {
        query:`
          mutation {
            createUser(userInput: {username: "${email}", password: "${password}"}) {
              _id
              username
            }
          }
        `
      }
    }
    
    fetch(`${API_DOMAIN}`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.status !== 200 && res.status !== 201) {
        throw new Error('Failed');
      }
      return res.json();
    }).then(resData => {
      console.log(resData)
      const {data} = resData;
      if(data && data.login.userId) {
       cookies.set("token", data.login.userId, { expires: 1 }); 
       Router.push("/addProject")
      }
    }).catch(err => {
      console.log(err)
    })
  }
  
  const inputOnChnage = () => {
    const email = inputEmail.current.value;
    const password = inputPassworrd.current.value
    if (email.trim().length !== 0 || password.trim().length !== 0) {
      setErrorState(false)
    }
  }
  
  const switchModeHandler = () => {
    setIsLogin(!isLogin)
  }

    return ( 
       <Container className={classes.root}>
         <Card>
          <CardContent>
             <Typography color="textSecondary" gutterBottom className={classes.title}>
              Sign Up
            </Typography>
            <form noValidate autoComplete="off" onSubmit={submitHandler}>
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