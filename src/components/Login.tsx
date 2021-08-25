import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components';
import {
  useLazyQuery,
  gql
} from '@apollo/client';
import Link from 'react-router-dom';

const StyledForm = styled(Form)`
  width: 500px;
  padding: 20px;
  margin: 10px auto 0px auto;
  background-color: whitesmoke;
`

const LoginHeader = styled.h3`
  text-align: center;
  margin-top: 90px;
  font-size: 40px;
`

const inputs = {
  marginTop: '15px'
}

const Login = ({ setCurrentUser } : any) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const USER = gql`
    query getUser($name: String!, $password: String!) {
      user(name: $name, password: $password) {
        id
        name
        password
      }
    }
  `;

  const [getUser, { loading, data }] = useLazyQuery(USER, {
    onCompleted: (data) => {
      if (data.user === null) {
        alert('username or password incorrect');
      } else {
        setCurrentUser({
          id: data.user.id,
          name: data.user.name,
          password: data.user.password
        })
        localStorage.clear();
        localStorage.username = data.user.name;
        localStorage.password = data.user.password;
        localStorage.id = data.user.id;
      }
      console.log(data.user);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  return (
    <div>
      <LoginHeader>Login</LoginHeader>
      <StyledForm onSubmit={(e: any) => {
        e.preventDefault();
        getUser({
          variables: {
            name: username,
            password: password
          }
        });
      }}>
        <FormGroup style={{top: '10px'}}>
          <Label for='usernameLogin'>Username:</Label>
          <Input 
            onChange={(e) => setUsername(e.target.value)} 
            type='text' 
            id='usernameLogin'>
          </Input>
        </FormGroup>
        <FormGroup style={inputs}>
          <Label for='passwordLogin'>Password:</Label>
          <Input 
            onChange={(e) => setPassword(e.target.value)} 
            type='password' 
            id='passwordLogin'>
          </Input>
        </FormGroup>
          <Button style={inputs} color='primary'>
            Submit
          </Button>
      </StyledForm>
    </div>
  );
}

export default Login;