import React from 'react';
import './App.css';
import Game from './component/GameDom';
export const GAME_BOARD_SIZE = 4;
const App = () => {
    return (
        <div id="app">
            <Game></Game>
        </div>
    );
};
export default App;
