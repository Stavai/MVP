import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

const Wrapper = styled.div`
  display: flex;
  margin-top: 20px;
`

const ScoreTracker = styled.div`
  margin-left: auto;
  margin-right: 150px;
  font-size: 25px;
`

const ScoreAndDropdowns = ({ songList, setCurrentSong, setCurrentDifficulty, points, totalPoints } : any) => {

  const [musicDropdownOpen, setMusicDropdownOpen] = useState(false);
  const toggleMusic = () => setMusicDropdownOpen(!musicDropdownOpen)

  const [difficultyDropdownOpen, setDifficultyDropdownOpen] = useState(false);
  const toggleDifficulty = () => setDifficultyDropdownOpen(!difficultyDropdownOpen);

  return (
    <Wrapper>

      <Button style={{marginLeft: '50px'}} color='primary'>
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
  )
}

export default ScoreAndDropdowns;