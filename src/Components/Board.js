import React, { Component } from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} />
    );
  }

  renderRow(i) {
    return (
      <div className="board-row">
        {this.renderSquare(i)}
        {this.renderSquare(i+1)}
        {this.renderSquare(i+2)}
      </div>
    );
  }

  render() {

    return (
      <div>
        {this.renderRow(0)}
        {this.renderRow(3)}
        {this.renderRow(6)}
      </div>
    );
  }
}

export default Board;
