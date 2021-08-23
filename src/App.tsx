import React from 'react';
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

// const USER = gql`
//   query getUser {
//     user(name: "steven") {
//       id
//       name
//       password
//     }
//   }
// `;

// function User() {
//   const { loading, error, data } = useQuery(USER);
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error</p>;
//   return <p>{data.user.name}, {data.user.password}</p>
// }

function App() {
  return (
    <div className="App">
      <h1>Keyboarding Hero</h1>
    </div>
  );
}

export default App;
