import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import Login from './components/Login';
import Signup from './components/Signup';
import ScoreBoard from './components/ScoreBoard';
import ScoreAndDropdowns from './components/ScoreAndDropdowns';
import {
  useQuery,
  useMutation,
  gql
} from "@apollo/client";

const GET_SONGS = gql`
  query Songs {
    songs {
      id
      bpm
      name
      song_text
      filename
    }
  }
`

const POST_SCORE = gql`
  mutation addScore($score: NewScore!) {
    postScore(details: $score) {
      id
      username
      score
      difficulty
      song
    }
  }
`

const DescendingKey = keyframes`
  from {top: 0px;}
  to {top: 280px;}
`

const CurrentChar = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 75px;
  width: 75px;
  border: solid;
  font-size: 30px;
  animation-name: ${DescendingKey};
`

function App() {

  const [playState, setPlayState] = useState('paused');

  const [currentUser, setCurrentUser] = useState<any>(null);

  const [songList, setSongList] = useState([]);
  const [currentSong, setCurrentSong] = useState<any>({});
  const [currentSongText, setCurrentSongText] = useState([]);
  const [currentTextChar, setCurrentTextChar] = useState<any>('');

  const [currentDifficulty, setCurrentDifficulty] = useState('');

  const [points, setPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const [countdown, setCountdown] = useState(3);
  const [isGameRunning, setIsGameRunning] = useState(false);

  const [saveToDb, setSaveToDb] = useState(false);

  const [postScore] = useMutation(POST_SCORE, {
    onCompleted: (result) => {
      console.log(result);
    },
    onError: (err) => {
      console.log(err);
    }
  })

  const { data, loading, error } = useQuery(GET_SONGS, {
    onCompleted: (result) => {
      console.log(result.songs);
      setSongList(result.songs)
    },
    onError: (err) => {
      console.log(err);
    }
  })

  const startGame = async () => {

    if (currentSongText.length > 0 && currentDifficulty !== '') {
      setPoints(0);
      setIsGameRunning(true);
      let characters = [...currentSongText];
      let speed = 
      currentDifficulty === 'Easy' ? 1000 :
      currentDifficulty === 'Medium' ? 500 :
      currentDifficulty === 'Hard' ? 200 : 0
  
      let loopChars = async () => {
        let shift = characters.shift();
        setTimeout(() => {
          setCurrentTextChar(shift);
          if (playState === 'paused') {
            setPlayState('running');
          }
          if (characters.length > 0) {
            loopChars()
          } else {
            setTimeout(() => {
              setPlayState('paused');
              setCurrentTextChar('');
              setIsGameRunning(false);
              setCountdown(3);
              setSaveToDb(true);
            }, speed)
          }
        }, speed)
      }
  
      let countDownRecurse = async (num: number) => {
        setTimeout(() => {
          // console.log(num);
          setCountdown(num);
          if (num > 0) {
            countDownRecurse(num - 1);
          } else {
            loopChars();
          }
        }, 1000)
      }
      countDownRecurse(2);
    } else {
      alert('please select a song and a difficulty');
    }
    
  }

  useEffect(() => {
    if (currentSong.song_text !== undefined) {
      setTotalPoints(currentSong.song_text.length);
      let split = currentSong.song_text.split('');
      setCurrentSongText(split);
    }
  }, [currentSong])

  useEffect(() => {
    console.log(currentTextChar)
    console.log(countdown)
  }, [currentTextChar, countdown])

  useEffect(() => {
    if (currentUser !== null && saveToDb === true) {
      postScore({
        variables: {
          score: {
            username: currentUser.name,
            score: points,
            difficulty: currentDifficulty,
            song: currentSong.name
          }
        }
      })
    }
    setSaveToDb(false);
  }, [saveToDb, currentUser, currentDifficulty, points, currentSong, postScore])

  useEffect(() => {
    if (localStorage.username && localStorage.password && localStorage.id) {
      setCurrentUser({
        id: localStorage.id,
        name: localStorage.username,
        password: localStorage.password
      })
    }
  }, [])

  return (
    <Router>
      <div className="App">
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <Switch>
          <Route path='/keyboard'>

            <ScoreAndDropdowns
              songList={songList}
              setCurrentSong={setCurrentSong}
              setCurrentDifficulty={setCurrentDifficulty}
              points={points}
              totalPoints={totalPoints}
              isGameRunning={isGameRunning}
              startGame={startGame}
              countdown={countdown}
            />

            <CurrentChar 
              id='currentChar' 
              style={{
                visibility: isGameRunning ? 'visible' : 'hidden',
                animationDuration: '1000ms',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear',
                animationPlayState: playState
              }}>
                {currentTextChar}
            </CurrentChar>

            <Keyboard 
              points={points}
              totalPoints={totalPoints}
              setPoints={setPoints}
              isGameRunning={isGameRunning}
              startGame={startGame}
              currentTextChar={currentTextChar}
            />
          </Route>
          <Route path='/scoreboard'>
            <ScoreBoard currentUser={currentUser}/>
          </Route>
          <Route path='/signup'>
            {currentUser !== null ? <Redirect to='/keyboard'/> : <Signup setCurrentUser={setCurrentUser}/>}
          </Route>
          <Route path='/login'>
            {currentUser !== null ? <Redirect to='/keyboard'/> : <Login setCurrentUser={setCurrentUser}/>}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
