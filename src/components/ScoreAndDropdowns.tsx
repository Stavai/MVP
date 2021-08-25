import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

const Wrapper = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`

const ScoreTracker = styled.div`
  margin-left: auto;
  margin-right: 150px;
  font-size: 25px;
`

const Countdown = styled.div`
  text-align: center;
  font-size: 20px;
`

const ScoreAndDropdowns = ({ songList, setCurrentSong, setCurrentDifficulty, points, totalPoints, isGameRunning, startGame, countdown } : any) => {

  const [musicDropdownOpen, setMusicDropdownOpen] = useState(false);
  const toggleMusic = () => setMusicDropdownOpen(!musicDropdownOpen)

  const [difficultyDropdownOpen, setDifficultyDropdownOpen] = useState(false);
  const toggleDifficulty = () => setDifficultyDropdownOpen(!difficultyDropdownOpen);

  return (
    <div>
       <Wrapper>

        <Button disabled={isGameRunning} onClick={() => startGame()} style={{marginLeft: '50px'}} color='primary'>
          Start
        </Button>

        <Dropdown style={{marginLeft: '10px'}} isOpen={musicDropdownOpen} toggle={toggleMusic}>
          <DropdownToggle caret>
            Music
          </DropdownToggle>
          <DropdownMenu>
            {songList !== undefined ? 
            songList.map((song: any) => {
              return <DropdownItem onClick={() => setCurrentSong(song)}>{song.name}</DropdownItem>
            }) : ''}
          </DropdownMenu>
        </Dropdown>

        <Dropdown style={{marginLeft: '10px'}} isOpen={difficultyDropdownOpen} toggle={toggleDifficulty}>
          <DropdownToggle caret>
            Difficulty
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setCurrentDifficulty('Easy')}>Easy</DropdownItem>
            <DropdownItem onClick={() => setCurrentDifficulty('Medium')}>Medium</DropdownItem>
            <DropdownItem onClick={() => setCurrentDifficulty('Hard')}>Hard</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <ScoreTracker>
          Score: {points} / {totalPoints}
        </ScoreTracker>

        </Wrapper>

        <Countdown style={{visibility: isGameRunning && countdown !== 0 ? 'visible' : 'hidden'}}>{countdown}</Countdown>
    </div>
   
  )
}

export default ScoreAndDropdowns;