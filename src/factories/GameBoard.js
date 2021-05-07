import { GAME_BOARD_SIZE } from '../App';

const GameBoard = (size) => {
    const board = Array.from(Array(size), () => new Array(size));
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = { usedBy: null, hit: false, available: true };
        }
    }
    let ships = [];
    const checkLose = () => {
        let res = true;
        ships.forEach((e) => {
            if (!e.isSunk()) res = false;
        });
        return res;
    };
    const canPlaceShipAt = (y, x, shipDirection, shipLength) => {
        if (shipDirection === 'x') {
            for (let i = x; i < shipLength + x; i++) {
                if (!board[y]) return false;
                else if (!board[y][i] || !board[y][i].available) return false;
            }
        } else if (shipDirection === 'y') {
            for (let i = y; i < shipLength + y; i++) {
                if (!board[i] || !board[i][x].available) return false;
            }
        } else throw new Error('wrong shipDirection argument');
        return true;
    };
    const place = (yStart, xStart, shipDirection, ship) => {
        ships.push(ship);
        if (shipDirection === 'y') {
            for (let i = yStart; i < yStart + ship.getLength(); i++) {
                board[i][xStart].usedBy = ship;
            }
            for (let i = yStart - 1; i < yStart + ship.getLength() + 1; i++) {
                if (board[i]) {
                    if (board[i][xStart]) board[i][xStart].available = false;
                    if (board[i][xStart - 1])
                        board[i][xStart - 1].available = false;
                    if (board[i][xStart + 1])
                        board[i][xStart + 1].available = false;
                }
            }
        } else if (shipDirection === 'x') {
            for (let i = xStart; i < xStart + ship.getLength(); i++) {
                board[yStart][i].usedBy = ship;
            }
            for (let i = xStart - 1; i < xStart + ship.getLength() + 1; i++) {
                if (board[yStart])
                    if (board[yStart][i]) board[yStart][i].available = false;
                if (board[yStart - 1])
                    if (board[yStart - 1][i])
                        board[yStart - 1][i].available = false;
                if (board[yStart + 1])
                    if (board[yStart + 1][i])
                        board[yStart + 1][i].available = false;
            }
        }
    };
    const receiveAttack = (y, x) => {
        let cell = board[y][x];
        cell.hit = true;
        if (cell.usedBy !== null) {
            cell.usedBy.hit();
        }
        return true;
    };
    const checkCell = (y, x) => {
        if (!board[y][x].hit) {
            if (board[y][x].usedBy === null) return 'empty';
            else return 'ship';
        } else return 'attacked';
    };
    return {
        checkCell,
        canPlaceShipAt,
        place,
        receiveAttack,
        checkLose,
        getBoard: () => board,
    };
};
export default GameBoard;
