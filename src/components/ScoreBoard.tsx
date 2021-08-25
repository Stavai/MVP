import React from 'react';
import styled from 'styled-components';
import { Table } from 'reactstrap';
import {
  useQuery,
  gql
} from '@apollo/client';

const StyledTable = styled(Table)`
  margin-top: 100px;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
`

const SCORES = gql`
  query getScores($username: String!) {
    userScores(username: $username) {
      username
      score
      difficulty
      song
    }
  }
`;

const ScoreBoard = ({ currentUser } : any) => {

  const { loading, error, data } = useQuery(SCORES, {
    variables: {
      username: currentUser !== null ? currentUser.name : ''
    }
  });

  // console.log(data.userScores);

  if (error) {
    return (
      <div>
        <StyledTable striped bordered hover>
          <thead>
            <tr>
              <th>Song</th>
              <th>Difficulty</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </StyledTable>
      </div>
    );
  }

  return (
    <div>
      <StyledTable striped bordered hover>
        <thead>
          <tr>
            <th>Song</th>
            <th>Difficulty</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data !== undefined ?
          data.userScores.map((score: any) => {
            return (
              <tr>
                <td>{score.song}</td>
                <td>{score.difficulty}</td>
                <td>{score.score}</td>
              </tr>
            );
          }) : ''}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default ScoreBoard;