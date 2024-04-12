import { useState } from 'react'
import './App.css'
import Board from './board'
import { players } from './board-var'

function App() {
  const [isLoggedOn, setIsLoggedOn] = useState(false);

  function enterName()
  {
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;

    if (name1 === name2 || name1 === '' || name2 === '') setIsLoggedOn(false);
    else
    {
      players[0].name = name1;
      players[1].name = name2;
      setIsLoggedOn(true);
    }
  }

  function InitForm()
  {
    return (
      <div id="form-back-drop">
        <form id="name-form">
          <div>
            Enter players name
          </div>
          <div className="name-input">
            First player:
            <input type="text" id="name1" />
          </div>
          <div className="name-input">
            Second player:
            <input type="text" id="name2" />
          </div>
          <button onClick={enterName} type='submit'>Play!</button>
          {!isLoggedOn && <div>Field cannot be empty.</div>}
        </form>
      </div>
    );
  }

  function GameArea()
  {
    return (
      <div id="interface">
        <div id="title">Tic-Tac-Toe</div>
        <Board />
      </div>
    );
  }

  return (
    <>
      {!isLoggedOn && <InitForm />}
      {isLoggedOn && <GameArea />}
    </>
  )
}

export default App