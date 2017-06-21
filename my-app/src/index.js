/* Short write-up on the basic process flow of this app

1) RenderDOM.render() renders Game component
2) Game component's constructor initializes the state containing history array of 9 squares and variables stepNumber and xIsNext
3) Game component's render function keeps a history of current moves executed and check if the game has been won through the function calculateWinner
4) Game component's render function passes both squares prop and onClick prop to the Board component
5) Board component's render function  returns the board state and passes the value prop and onClick prop (passed from Game) to the Square component
6) Square is a functional component since it only consists of a render method. It sets up a click event listener and passes the function props.onClick to the parent component when the square is clicked.

*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {

    return (
      
      //Click event listener, update to component scheduled, rerenders component 
      <button className="square" onClick={props.onClick}> 
 
        {/*sets the current value of the parameter props*/}
        {props.value}         

      </button>
    );

}

class Board extends React.Component {

  renderSquare(i) {
    //passes two props from Board to Square
    return (
            <Square

            //Passes value prop to Square
            //Takes in takes squares via props from Game component          
            value = {this.props.squares[i]}

            //onClick prop: Pass down this function from Board to Square that gets called when square is clicked
            //onClick prop specified by Game component
            onClick = {() => this.props.onClick(i)}  

            />

           ); 
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

  //Constructor to set initial state to contain array corresponding to 9 squares  
  constructor() {
     
    //Needed when defining constructor of subclass
    super();
    
    //Sets state, this.state is private to the React component
    this.state = {
        history: [{
        squares: Array(9).fill(null),
        }],
    
        stepNumber: 0,
        xIsNext: true,
    };
  }

  handleClick(i) {
    
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    //copy squares array
    const squares = current.squares.slice();

    // || squares[i] to check if it is null, if null then do nothing
    if (calculateWinner(squares) || squares[i]) {
        return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
    
        //push new entry onto the stack by concat new hist entry to make new hist array
        history: history.concat([{
            squares: squares
        }]),

        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
    });

  }

  jumpTo(step) {
    this.setstate({
        stepNumber:step,
        xIsNext: (step % 2) ? false : true,
    });
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ?
        'Move #' + move :
        'Game start';
        return (
            //key with unique ID (number of moves happened)
            <li key={move}>
                <a href="Number" onClick={() => this.jumpTo(move)}>{desc}</a>
            </li>
        );
    });

    let status;
    
    if (winner) {
        status = 'Winner: ' + winner;
    }
    
    else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">

          <Board

            //pass squares prop to Board
            squares = {current.squares}

            //passes onClick prop to Board
            onClick = {(i) => this.handleClick(i)}
          />

        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
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

function calculateWinner(squares) {

  //arrays of winning pattern
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

  //for loop to check each line and if it matches the winning pattern
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    
    //if statement checks if all 3 squares are not null and they are from the same player X or O
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
