import React, { Component } from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          //squares: [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]]//Array(9).fill(null)
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      oIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.oIsNext ? 'O' : 'X';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: this.state.stepNumber + 1,
      oIsNext: !this.state.oIsNext
    });
  }

  calculateWinner(squares) {
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

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      oIsNext: (step % 2) ? false : true
    });
  }

  render() {
    const history = this.state.history;
    const totalMoves = history.length;
    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game start';
      const currentMoveStyle = {
        fontWeight: move === totalMoves - 1 ? 'bold' : 'normal',
        color: move === totalMoves - 1 ? 'red' : 'black'
      };

      return (
        <li key={move}>
          <a href="#" style={currentMoveStyle} onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.oIsNext ? 'O' : 'X');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
