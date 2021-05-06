import BoardDom from './BoardDom';
import '../style/GameDom.css';
import { useEffect, useState } from 'react';
import Player from '../factories/Player';
import Ship from '../factories/Ship';
import { GAME_BOARD_SIZE } from '../App';
import AttacksHandler from '../factories/AttacksHandler';
import ShipPlacer from '../factories/ShipPlacer';
const shipsForEachPlayer = [
    // Ship(4),
    // Ship(3),
    // Ship(3),
    // Ship(2),
    // Ship(2),
    // Ship(2),
    // Ship(1),
    // Ship(1),
    Ship(1),
    Ship(1),
];
const Game = () => {
    const [player1, setPlayer1] = useState(
        Player(GAME_BOARD_SIZE, 'human', true)
    );
    const [player2, setPlayer2] = useState(
        Player(GAME_BOARD_SIZE, 'AI', false)
    );
    const [gameActive, setGameActive] = useState(false);
    const [attacksUpdater, setAttacksUpdater] = useState(true);
    const attacksHandler = AttacksHandler(player1, player2);
    const [turnToggle, setTurnToggle] = useState('human');
    const [attackedCellByHuman, setAttackedCellByHuman] = useState(null);
    const initPlayer = (p, enemy) => {
        const player = Object.assign({}, p);
        const board = player.board;
        player.setEnemy(enemy);
        ShipPlacer(player, shipsForEachPlayer, shipPlacerFinished);
        return player;
    };
    const shipPlacerFinished = () => {
        setGameActive(true);
    };
    const isGameOverFor = (player) => {
        console.log(player2.board.getBoard(), ' AI');
        console.log(player1.board.getBoard(), ' human');
        console.log(player.board.checkLose());
        return player.board.checkLose();
    };

    const winnerIs = (player) => {
        console.log(player.user + ' winner');
    };
    const cellClickedAtCallback = (cell) => {
        if (isGameOverFor(player2)) {
            console.log('winner is human');
            setGameActive(false);
            document.location.reload();
        }
        if (cell.id.includes('AI') && turnToggle === 'human') {
            let result = attacksHandler.humanAttacked(cell);

            if (result === 'empty') {
                setTurnToggle(() => 'AI');
            }
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
            }
            if (isGameOverFor(player1)) {
                console.log('winner is AI');
                winnerIs(player2);
                setGameActive(false);
            }
        }
    }, [turnToggle, gameActive]);
    return (
        <main id="game">
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
        </main>
    );
};
export default Game;
