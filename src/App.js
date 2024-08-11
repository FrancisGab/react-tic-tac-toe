import { useState } from "react";

// Identity is Square. Anonymous function assigned to Square.
const Square = function ({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

function Board({ xIsNext, squares, onPlay }) {
  // High order function - a function that returns a function.
  function createHandleClick(i) {
    return function handleClick() {
      // || is an "OR" condition. && is an "AND" condition.
      if (calculateWinner(squares) || squares[i]) {
        // Early termination.
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      onPlay(nextSquares);
    };
  }

  const winner = calculateWinner(squares);
  // Variable "status" is initiated but value is undefined.
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={createHandleClick(0)} />
        <Square value={squares[1]} onSquareClick={createHandleClick(1)} />
        <Square value={squares[2]} onSquareClick={createHandleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={createHandleClick(3)} />
        <Square value={squares[4]} onSquareClick={createHandleClick(4)} />
        <Square value={squares[5]} onSquareClick={createHandleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={createHandleClick(6)} />
        <Square value={squares[7]} onSquareClick={createHandleClick(7)} />
        <Square value={squares[8]} onSquareClick={createHandleClick(8)} />
      </div>
    </>
  );
}

export function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  console.log("Moves, ", typeof moves);
  console.log("History, ", history);

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// It doesn't matter if this function is before or after the board. Lets
// put it at the end so that you don't have to scroll past it every time you edit.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
