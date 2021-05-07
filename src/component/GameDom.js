import BoardDom from './BoardDom';
import '../style/GameDom.css';
import { useEffect, useState } from 'react';
import Player from '../factories/Player';
import { GAME_BOARD_SIZE } from '../App';
import AttacksHandler from '../factories/AttacksHandler';
import ShipPlacer from '../factories/ShipPlacer';
const shipsLengthForEachPlayer = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
const Game = () => {
    const [message, setMessage] = useState(
        'Place your ships, press R to rotate ship'
    );

    const [messageOpacity, setMessageOpacity] = useState({
        color: 'rgba(0, 0, 0, 1)',
    });
    const [player1, setPlayer1] = useState(
        Player(GAME_BOARD_SIZE, 'human', true)
    );
    const [player2, setPlayer2] = useState(
        Player(GAME_BOARD_SIZE, 'AI', false)
    );
    const [gameActive, setGameActive] = useState(false);
    const attacksHandler = AttacksHandler(player1, player2);
    const [turnToggle, setTurnToggle] = useState('human');
    const initPlayer = (p, enemy) => {
        const player = Object.assign({}, p);
        player.setEnemy(enemy);
        ShipPlacer(player, shipsLengthForEachPlayer, shipPlacerFinished);
        return player;
    };
    const shipPlacerFinished = () => {
        setGameActive(true);
        changeMessage('Start attacking the enemy board.');
    };
    const changeMessage = (msg) => {
        setMessageOpacity({ color: 'rgba(0, 0, 0, 0)' });
        setTimeout(() => {
            setMessage(msg);
        }, 500);
        setTimeout(() => {
            setMessageOpacity({ color: 'rgba(0, 0, 0, 1)' });
        }, 500);
    };
    const isGameOverFor = (player) => {
        return player.board.checkLose();
    };

    const winnerIs = (player) => {
        if (player.user === 'human') changeMessage("It's your win!!!");
        else changeMessage("It's the computer win :(");
    };
    const gameOver = () => {
        setTimeout(() => {
            document.location.reload();
        }, 5000);
    };
    const cellClickedAtCallback = (cell) => {
        if (cell.id.includes('AI') && turnToggle === 'human') {
            let result = attacksHandler.humanAttacked(cell);
            if (result === 'empty') {
                setTurnToggle(() => 'AI');
            }
        }
        if (isGameOverFor(player2)) {
            winnerIs(player1);
            setGameActive(false);
            gameOver();
        }
    };
    useEffect(() => {
        setPlayer1(initPlayer(player1, player2));
        setPlayer2(initPlayer(player2, player1));
    }, []);

    useEffect(() => {
        if (gameActive) {
            if (turnToggle === 'AI') {
                attacksHandler.AIAttack();
                setTurnToggle(() => 'human');
            } else if (turnToggle === 'human') {
                changeMessage('Your turn');
            }
            if (isGameOverFor(player1)) {
                winnerIs(player2);
                setGameActive(false);

                gameOver();
            }
        }
    }, [turnToggle, gameActive]);
    return (
        <main id="game">
            <div id="message" style={messageOpacity}>
                {message}
            </div>
            <div id="boards-container">
                <BoardDom
                    player={player1}
                    enemy={player2.user}
                    boardClickedAt={cellClickedAtCallback}
                    gameStarted={gameActive}
                ></BoardDom>
                <BoardDom
                    player={player2}
                    enemy={player1.user}
                    boardClickedAt={cellClickedAtCallback}
                    gameStarted={gameActive}
                ></BoardDom>
            </div>
        </main>
    );
};
export default Game;
