import GameBoard from './GameBoard';

const Player = (boardSize, user) => {
    let enemy = null;

    const board = GameBoard(boardSize);
    const setEnemy = (otherPlayer) => {
        enemy = otherPlayer;
    };
    const AIAttack = () => {
        const [y, x] = [
            Math.floor(Math.random() * boardSize),
            Math.floor(Math.random() * boardSize),
        ];
        const msg = enemy.board.checkCell(y, x);
        if (msg === 'empty' || msg === 'ship') enemy.board.receiveAttack(y, x);
        else if (msg !== 'attacked') throw new Error(msg);
        return [y, x, msg];
    };
    return {
        user,
        board,
        setEnemy,
        AIAttack,
    };
};
export default Player;
