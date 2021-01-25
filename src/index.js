import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  /** Re-write code as function */ /*
  class Square extends React.Component {
    render() {
      return (
        <button 
          className="square"
          onClick={() => this.props.onClick()}
        >
          {this.props.value}
        </button>
      );
    }
  } */

  function Square(props) {
    return (
      <button
        className='square'
        onClick={() => props.onClick()}
      >
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
        />;
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          xIsNext: true,
          stepNum: 0,
          /* More states if needed */
      }
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNum+1);
      const current = history[history.length - 1];
      const squareValues = current.squares.slice();
      if (getWinner(squareValues) || squareValues[i]) {
        return;
      }

      squareValues[i] = this.state.xIsNext ? 'X':'O';

      this.setState({
        history: history.concat([{squares: squareValues}]), 
        stepNum: history.length,
        xIsNext: !this.state.xIsNext,
      });
      /*console.log(this.state) */ /**  Just to see what the board looks like*/
    }

    jumpTo(step) {
      this.setState({
        stepNum: step,
        xIsNext: (step % 2) === 0,
      })
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNum];
      const checkWinner = getWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      const status = checkWinner ? 'Winner: ' + (checkWinner) : 'Next player: ' + (this.state.xIsNext ? 'X':'O');

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares} 
              onClick={(i) =>this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function getWinner(squares) {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < wins.length; i++) {
      const [a, b, c] = wins[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
  return null;
  }