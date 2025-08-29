import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function Square({ value, onClick, isWinning }) {
  return (
    <button 
      className={`square ${isWinning ? 'winning-line' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

// PUBLIC_INTERFACE
function Board({ squares, onClick, winningSquares }) {
  const renderSquare = (i) => {
    return (
      <Square 
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={winningSquares && winningSquares.includes(i)}
      />
    );
  };

  return (
    <div className="board">
      {[...Array(9)].map((_, i) => renderSquare(i))}
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...currentHistory, squares]);
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  };

  const current = history[stepNumber];
  const winnerInfo = calculateWinner(current);
  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line;

  const isDraw = !winner && current.every(square => square !== null);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Game Draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const handleRestart = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="game-title">Tic Tac Toe</h1>
      </header>

      <div className="status">{status}</div>

      <Board 
        squares={current}
        onClick={handleClick}
        winningSquares={winningLine}
      />

      <footer className="footer">
        <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button>
      </footer>
    </div>
  );
}

export default App;
