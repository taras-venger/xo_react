import React, { Component } from 'react';
import Cell from './components/Cell';
import './App.css';

class App extends Component {
  state = {
    moves: Array(9).fill(null),
    gameOver: false
  };

  cellAvailability = id => !this.state.moves[id];

  checkWin = moves => {
    let winner;
    const winningOptions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    const win = winningOptions.some(option => {
      const [a, b, c] = option;
      const match = moves[a] && moves[a] === moves[b] && moves[a] === moves[c];
      if (match) winner = moves[a];
      return match;
    });
    return win && winner;
  };

  checkDraw = moves => moves.every(el => el !== null);
  };

  gameOver = moves => this.checkWin(moves) || this.checkDraw(moves);

  makeMove = id => {
    if (!this.state.gameOver) {
      //Player's move:
      const moves = this.state.moves.slice();
      if (this.cellAvailability(id)) {
        moves[id] = 'X';
        let gameOver = this.gameOver(moves);
        // Machine's move
        if (!gameOver) {
          const vacantIDs = [];
          moves.forEach((player, id) => !player && vacantIDs.push(id));
          const id2 = vacantIDs[Math.floor(Math.random() * vacantIDs.length)];
          moves[id2] = '0';
          gameOver = this.gameOver(moves);
        }
        this.setState({ moves, gameOver });
      } else {
        alert('Selected cell is not available');
      }
    }
  };

  resetGame = () => {
    this.setState({
      moves: Array(9).fill(null),
      gameOver: false
    });
  };

  renderCell = id => (
    <Cell
      key={id}
      id={id}
      makeMove={event => this.makeMove(event.target.id)}
      player={this.state.moves[id]}
    />
  );

  renderCells = () =>
    Array(9)
      .fill()
      .map((_, i) => this.renderCell(i));

  render() {
    return (
      <div className='App'>
        <h1>Tic Tac Toe</h1>
        <div className='table'>{this.renderCells()}</div>
        <button onClick={this.resetGame}>Start new game</button>
      </div>
    );
  }
}

export default App;
