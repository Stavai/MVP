import React, { useState, useEffect } from 'react';
import ScoreAndDropdowns from './ScoreAndDropdowns';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useKeyPress } from 'ahooks';
import styled from 'styled-components';

const KeyboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: solid;
  border-width: 2px;
  width: 1370px;
  margin: 300px auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  .pressed {
    background-color: red;
  }
`

const Key = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid;
  border-width: 2px;
  width: 75px;
  height: 75px;
  margin: 7px;
`

const Shift = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid;
  border-width: 2px;
  width: 166px;
  height: 75px;
  margin: 7px;
`

const Spacebar = styled.div`
  border: solid;
  border-width: 2px;
  width: 530px;
  height: 75px;
  margin: 7px;
  margin-right: 94px;
`

const RowOne = styled.div`
  display: flex;
  justify-content: center;
  padding-right: 140px;

`

const RowTwo = styled.div`
  display: flex;
  justify-content: center;
  padding-right: 10px;
`

const RowThree = styled.div`
  display: flex;
  justify-content: center;
`

const RowFour = styled.div`
  justify-content: center;
  display: flex;
`

const Keyboard = ({ songList, setCurrentSong, setCurrentDifficulty, points, totalPoints, setPoints, isGameRunning, startGame, currentTextChar } : any) => {

  const [currentKey, setCurrentKey] = useState('');
  const [shift, setShift] = useState(false);

  const filterKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '[', ']', '{', '}', '|', '=', '+', '-', '_', '`', '~'];

  useKeyPress((e) => !(filterKey).includes(e.key), (e) => {
    setCurrentKey(e.key)

    if (isGameRunning === true) {
      if (e.key === currentTextChar) {
        setPoints(points + 1);
      } else if (e.key !== currentTextChar) {
        setPoints(points - 1);
      }
    }

    if (e.code === 'Space') {
      e.preventDefault()
    }
    document.querySelector(`.${e.code}`)?.classList.add('pressed');
  }, {
    events: ['keydown']
  })

  useKeyPress((e) => !(filterKey).includes(e.key), (e) => {
    document.querySelector(`.${e.code}`)?.classList.remove('pressed');
    setCurrentKey('');
  }, {
    events: ['keyup']
  })

  useKeyPress(16, (e) => {
    setShift(true)
  }, {
    events: ['keydown']
  })

  useKeyPress(16, (e) => {
    setShift(false)
  }, {
    events: ['keyup']
  })

  // useEffect(() => {
  //   console.log(currentKey);
  // }, [currentKey])

  return (
    <div>

      {/* <ScoreAndDropdowns 
        songList={songList}
        setCurrentSong={setCurrentSong}
        setCurrentDifficulty={setCurrentDifficulty}
        points={points}
        totalPoints={totalPoints}
        isGameRunning={isGameRunning}
        startGame={startGame}
      /> */}

      <KeyboardWrapper>

        <RowOne>
          <Key className='KeyQ'>{shift ? 'Q' : 'q'}</Key>
          <Key className='KeyW'>{shift ? 'W' : 'w'}</Key>
          <Key className='KeyE'>{shift ? 'E' : 'e'}</Key>
          <Key className='KeyR'>{shift ? 'R' : 'r'}</Key>
          <Key className='KeyT'>{shift ? 'T' : 't'}</Key>
          <Key className='KeyY'>{shift ? 'Y' : 'y'}</Key>
          <Key className='KeyU'>{shift ? 'U' : 'u'}</Key>
          <Key className='KeyI'>{shift ? 'I' : 'i'}</Key>
          <Key className='KeyO'>{shift ? 'O' : 'o'}</Key>
          <Key className='KeyP'>{shift ? 'P' : 'p'}</Key>
        </RowOne>

        <RowTwo>
          <Key className='KeyA'>{shift ? 'A' : 'a'}</Key>
          <Key className='KeyS'>{shift ? 'S' : 's'}</Key>
          <Key className='KeyD'>{shift ? 'D' : 'd'}</Key>
          <Key className='KeyF'>{shift ? 'F' : 'f'}</Key>
          <Key className='KeyG'>{shift ? 'G' : 'g'}</Key>
          <Key className='KeyH'>{shift ? 'H' : 'h'}</Key>
          <Key className='KeyJ'>{shift ? 'J' : 'j'}</Key>
          <Key className='KeyK'>{shift ? 'K' : 'k'}</Key>
          <Key className='KeyL'>{shift ? 'L' : 'l'}</Key>
          <Key className='Semicolon'>{shift ? ';' : ':'}</Key>
          <Key className='Quote'>{shift ? "'" : '"'}</Key>
        </RowTwo>

        <RowThree>
          <Shift className='ShiftLeft'>shift</Shift>
          <Key className='KeyZ'>{shift ? 'Z' : 'z'}</Key>
          <Key className='KeyX'>{shift ? 'X' : 'x'}</Key>
          <Key className='KeyC'>{shift ? 'C' : 'c'}</Key>
          <Key className='KeyV'>{shift ? 'V' : 'v'}</Key>
          <Key className='KeyB'>{shift ? 'B' : 'b'}</Key>
          <Key className='KeyN'>{shift ? 'N' : 'n'}</Key>
          <Key className='KeyM'>{shift ? 'M' : 'm'}</Key>
          <Key className='Comma'>{shift ? '<' : ','}</Key>
          <Key className='Period'>{shift ? '>' : '.'}</Key>
          <Key className='Slash'>{shift ? '?' : '/'}</Key>
          <Shift className='ShiftRight'>shift</Shift>
        </RowThree>

        <RowFour>
          <Spacebar className='Space'></Spacebar>
        </RowFour>

      </KeyboardWrapper>
    </div>
  );
}

export default Keyboard;