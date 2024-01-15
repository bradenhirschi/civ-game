import React, { Component, RefObject } from 'react';
import './styles/App.css';
import Game from './components/Game';

class App extends Component {
  gameRef: RefObject<Game> = React.createRef();

  componentDidMount() {
    if (this.gameRef.current) {
      // this.gameRef.current.someMethod();
    } else {
      console.error('Error creating game');
    }
  }

  render() {
    return (
      <div>
        <Game numPlayers={2} ref={this.gameRef} />
      </div>
    );
  }
}

export default App;
