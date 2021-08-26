import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';

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

const POST_USER = gql`
  mutation PostUser($newUser: NewUser!) {
    postUser(credentials: $newUser) {
      id
      name
      password
    }
  }
`

const Signup = ({ setCurrentUser } : any) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [postUser, { data, loading, error }] = useMutation(POST_USER, {
    onCompleted: (result) => {
      console.log(result);
      alert(`thanks for signing up ${result.postUser.name}!`);
      setCurrentUser(result.postUser)
      localStorage.clear()
      localStorage.id = result.postUser.id;
      localStorage.username = result.postUser.name;
      localStorage.password = result.postUser.name;
    },
    onError: (err) => {
      console.log(err);
      alert('user already exists!')
    }
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    postUser({
      variables: {
        newUser: {
          name: username,
          password: password
        }
      }
    })
  }

  return (
    <div>
    <LoginHeader>Signup</LoginHeader>
    <StyledForm onSubmit={onSubmit}>
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

export default Signup;