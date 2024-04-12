import { useState } from 'react';
import './board.css';
import { winningPos, boardArr, players, getArr, reset } from './board-var';

const size = 3;

function checkBoard(idx, turn, player)
{
    if (boardArr[idx] !== -1) return 'filled';
    let content = '';
    let playerNum = turn % 2;
    console.log('playerNum: ' + playerNum + '\n\n\n');
    boardArr[idx] = playerNum;
    if (turn >= 3)
    {
        for (let i = 0; i < winningPos.length; i++)
        {
            if (idx === winningPos[i].idx)
            {
                if (playerNum === winningPos[i].playerNum)
                {
                    player.score++;
                    content = player.name + ' wins!';
                    return content;
                }
                else winningPos.splice(i, 1);
            }
        }
    }

    if (turn === 8) return 'Draw!'

    if (turn >= 2)
    {
        let curr = (idx > size - 1 ? idx % size: idx);
        let count = 0;
        let posLeft = -1;
        console.log('curr: ' + curr);
        console.log('idx: ' + idx + '\n\n\n');
        console.log('check column');
        // check column
        for (let i = curr; i < size * size; i += 3)
        {
            console.log('i: ' + i);
            if (boardArr[i] === playerNum) count++;
            if (boardArr[i] === -1) posLeft = i;    
        }
        if (count >= size - 1 && posLeft !== -1 && (winningPos.length === 0 || winningPos.find(pos => (playerNum) === pos.playerNum && posLeft === pos.idx) === undefined))
            winningPos.push({
                idx: posLeft,
                playerNum: playerNum,
            });
        console.log('count: ' + count);
        console.log('posLeft: ' + posLeft + '\n\n\n');

        count = 0;
        posLeft = -1;
        
        console.log('check row');
        // check row
        for (let i = size * Math.floor((idx / 3)); i < (idx > size - 1 ? size + (Math.floor(idx / size) * size) : size); i++)
        {
            console.log('i: ' + i);
            if (boardArr[i] === playerNum) count++;
            if (boardArr[i] === -1) posLeft = i;
        }
        console.log('count: ' + count);
        console.log('posLeft: ' + posLeft + '\n\n\n');
        
        if (count >= size - 1 && posLeft !== -1 && (winningPos.length === 0 || winningPos.find(pos => (playerNum) === pos.playerNum && posLeft === pos.idx) === undefined))
        winningPos.push({
    idx: posLeft,
                playerNum: playerNum,
        });
        count = 0;
        posLeft = -1;
            
            // check main diagonal
        if (idx === 0 || idx === 4 || idx === 8)
        {
            console.log('check main diagonal');
            for (let i = 0; i < size * size; i += 4)
            {
                console.log('i: ' + i);
                if (boardArr[i] === playerNum) count++;
                if (boardArr[i] === -1) posLeft = i;
            }
            console.log('count: ' + count);
            console.log('posLeft: ' + posLeft + '\n\n\n');

            if (count >= size - 1 && posLeft !== -1 && (winningPos.length === 0 || winningPos.find(pos => (playerNum) === pos.playerNum && posLeft === pos.idx) === undefined))
                winningPos.push({
                    idx: posLeft,
                    playerNum: playerNum,
                });
            count = 0;
            posLeft = -1;
        }

        // check anti diagonal
        if (idx === 2 || idx === 4 || idx === 6)
        {
            console.log('check anti diagonal');
            for (let i = 2; i < (size * size) - 2; i += 2)
            {
                console.log('i: ' + i);
                if (boardArr[i] === playerNum) count++;
                if (boardArr[i] === -1) posLeft = i;
            }
            console.log('count: ' + count);
            console.log('posLeft: ' + posLeft + '\n\n\n');

            if (count >= size - 1 && posLeft !== -1 && (winningPos.length === 0 || winningPos.find(pos => (playerNum) === pos.playerNum && posLeft === pos.idx) === undefined))
                winningPos.push({
                    idx: posLeft,
                    playerNum: playerNum,
                });
            count = 0;
            posLeft = -1;
        }
        console.log(winningPos);
        console.log(boardArr);
        console.log('\n\n');
    } 
    return '';
}

export default function Board()
{
    const [turn, setTurn] = useState(0);
    const [boardState, setBoardState] = useState('');
    const [gameState, setGameState] = useState(true);

    function changeTurn(idx)
    {
        if (!gameState) return;
        let state = checkBoard(idx, turn, players[turn % 2]);
        if (state === 'filled') return;
        document.getElementById('grid' + idx).innerHTML = (turn % 2 === 0 ? 'X' : 'O');
        if (state !== '')
        {
            setBoardState(state);
            setGameState(false);
            return;
        }
        setTurn(turn + 1);
    }

    function resetBoard()
    {
        reset();
        setGameState(true);
        setBoardState('');
        setTurn(0);
    }

    const grids = getArr(9).map(element => 
    <div
        key={element}
        className='grid'
        id={'grid' + element}
        onClick={() => {changeTurn(element)}}
    ></div>);

    const playerInfos = players.map(player =>
    <div className='playerInfo' key={player.name}>
        {player.name} - {player.score}
    </div>)

    return (
        <div id='game'>
            <div id="board-container">
                <div id='board'>
                    {grids}
                </div>
            </div>
            <div id="functional_interface">
                {playerInfos}
                <div id="state">{boardState}</div>
                {(!gameState && <button id='reset-btn' type='reset' onClick={resetBoard}>Reset</button>)}
            </div>
        </div>
    );
}