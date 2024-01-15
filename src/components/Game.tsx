import React, { Component, RefObject } from 'react';
import Board from './Board';
import Player from './Player';
import Unit from './Unit';

interface GameProps {
  numPlayers: number,
}

interface GameState {
  players: string[];
  currentPlayer: number;
  board: Board; // Change the type to Board
}

class Game extends Component<GameProps, GameState> {
  boardRef: RefObject<Board> = React.createRef();
  public players: Player[] = [];

  constructor(props: GameProps) {
    super(props);

    for (let i = 0; i < props.numPlayers; i++) {
      this.players.push(new Player()); 
    }

    this.state = {
      board: this.boardRef.current!,
      players: ['Player 1', 'Player 2'],
      currentPlayer: 0,
    };
  }

  switchPlayer = () => {
    this.setState((prevState) => ({
      currentPlayer: (prevState.currentPlayer + 1) % this.state.players.length,
    }));
  };

  render() {
    const { players, currentPlayer } = this.state;

    return (
      <div>
        <h2>Current Player: {players[currentPlayer]}</h2>
        <Board ref={this.boardRef} players={this.players} />
        <button onClick={this.switchPlayer}>Switch Player</button>
      </div>
    );
  }
}

export default Game;
