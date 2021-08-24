import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import Login from './components/Login';
import Signup from './components/Signup';
import ScoreBoard from './components/ScoreBoard';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const USER = gql`
  query getUser {
    user(name: "steven") {
      id
      name
      password
    }
  }
`;

function User() {
  const { loading, error, data } = useQuery(USER);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  return <p>{data.user.name}, {data.user.password}</p>
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        {/* <User/> */}
        <Switch>
          <Route path='/keyboard' component={Keyboard} />
          <Route path='/scoreboard' component={ScoreBoard} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
