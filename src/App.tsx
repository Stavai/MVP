import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import Login from './components/Login';
import Signup from './components/Signup';
import ScoreBoard from './components/ScoreBoard';
import {
  useQuery,
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

function App() {

  const [currentUser, setCurrentUser] = useState<any>(null);

  const [songList, setSongList] = useState([]);
  const [currentSong, setCurrentSong] = useState<any>({});
  const [currentSongText, setCurrentSongText] = useState([]);

  const [currentDifficulty, setCurrentDifficulty] = useState('');

  const [points, setPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const [isGameRunning, setIsGameRunning] = useState(false);

  const { data, loading, error } = useQuery(GET_SONGS, {
    onCompleted: (result) => {
      console.log(result.songs);
      setSongList(result.songs)
    },
    onError: (err) => {
      console.log(err);
    }
  })

  const startGame = () => {
    
  }

  useEffect(() => {
    // console.log(currentUser);
    // console.log(songList)
    // console.log(currentSong);
    // console.log(currentDifficulty);
    console.log(totalPoints)
    console.log(currentSongText)
  }, [currentUser, songList, currentSong, currentDifficulty, totalPoints, currentSongText])


  useEffect(() => {
    if (currentSong.song_text !== undefined) {
      setTotalPoints(currentSong.song_text.length);
      let split = currentSong.song_text.split('');
      setCurrentSongText(split);
    }
  }, [currentSong])

  return (
    <Router>
      <div className="App">
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <Switch>
          <Route path='/keyboard'>
            <Keyboard 
              songList={songList} 
              setCurrentDifficulty={setCurrentDifficulty}
              setCurrentSong={setCurrentSong}
              points={points}
              totalPoints={totalPoints}
              setPoints={setPoints}
              isGameRunning={isGameRunning}
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
