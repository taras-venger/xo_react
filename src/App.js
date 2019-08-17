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
      //Player's move:
      const moves = this.state.moves.slice();
        moves[id] = 'X';
        // Machine's move
    if (!this.gameOver(moves)) {
          const vacantIDs = [];
          moves.forEach((player, id) => !player && vacantIDs.push(id));
      const random = vacantIDs[Math.floor(Math.random() * vacantIDs.length)];
      moves[random] = '0';
        }
    this.setState({ moves, gameOver: this.gameOver(moves) });
  };

  handleClick = event => {
    const { id } = event.target.dataset;
    if (!(this.state.gameOver || this.state.moves[id])) this.makeMove(id);
  };

  componentDidUpdate = () => {
    const winner = this.checkWin(this.state.moves);
    const draw = this.checkDraw(this.state.moves);
    if (winner) {
      setTimeout(() => alert(`Player ${winner} won`), 0);
    } else if (draw) {
      setTimeout(() => alert(`Game over`), 0);
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
      click={this.handleClick.bind(this)}
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
