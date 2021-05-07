import GameBoard from '../factories/GameBoard';
import Ship from '../factories/Ship';

test('GameBoard - 1 - should return an array that contains { usedBy:null, hit:false} values', () => {
    expect(GameBoard(2).getBoard()).toMatchObject([
        [
            { usedBy: null, hit: false },
            { usedBy: null, hit: false },
        ],
        [
            { usedBy: null, hit: false },
            { usedBy: null, hit: false },
        ],
    ]);
});

test('GameBoard - 2 - placing a ship horizontally should make { usedBy: ship } for all its cells', () => {
    let gameBoard = GameBoard(3);
    let ship = Ship(2);
    gameBoard.place(0, 0, 'x', ship);
    expect(gameBoard.getBoard()[0][0].usedBy).toEqual(ship);
    expect(gameBoard.getBoard()[0][1].usedBy).toEqual(ship);
});

test('GameBoard - 3 - placing a ship vertically should make { usedBy: ship } for all its cells', () => {
    let gameBoard = GameBoard(3);
    let ship = Ship(2);
    gameBoard.place(1, 1, 'y', ship);
    expect(gameBoard.getBoard()[1][1].usedBy).toEqual(ship);
    expect(gameBoard.getBoard()[2][1].usedBy).toEqual(ship);
});

test('GameBoard - 4 - receiving an attack should make { hit: true } for the receiving cell in the board', () => {
    let gameBoard = GameBoard(3);
    let ship = Ship(2);
    gameBoard.place(0, 0, 'x', ship);
    gameBoard.receiveAttack(0, 0);
    expect(gameBoard.getBoard()[0][0].hit).toBeTruthy();
});

test('GameBoard - 5 - receiving attacks in all the ship cells should make the ship sink', () => {
    let gameBoard = GameBoard(3);
    let ship = Ship(2);
    gameBoard.place(0, 0, 'x', ship);
    gameBoard.receiveAttack(0, 0);
    expect(ship.isSunk()).toBeFalsy();
    gameBoard.receiveAttack(0, 1);
    expect(ship.isSunk()).toBeTruthy();
});

test('GameBoard - 6 - checkLose should return true after all ships have sunk', () => {
    let gameBoard = GameBoard(2);
    let ship1 = Ship(2);
    let ship2 = Ship(1);
    gameBoard.place(0, 0, 'x', ship1);
    gameBoard.place(1, 0, 'x', ship2);
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(0, 1);
    gameBoard.receiveAttack(1, 0);
    expect(gameBoard.checkLose()).toBeTruthy();
});

test('GameBoard - 7 - checkLose should return false if all ships have not been sunk yet', () => {
    let gameBoard = GameBoard(2);
    let ship1 = Ship(2);
    let ship2 = Ship(1);
    gameBoard.place(0, 0, 'x', ship1);
    gameBoard.place(1, 0, 'x', ship2);
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(1, 0);
    expect(gameBoard.checkLose()).toBeFalsy();
});

test('GameBoard - 8 - canPlaceShipAt should return true if all places required for it are empty horizontally', () => {
    let gameBoard = GameBoard(3);
    let s1 = Ship(2);
    let s2 = Ship(2);
    expect(gameBoard.canPlaceShipAt(0, 0, 'x', s1.getLength())).toBe(true);
    gameBoard.place(0, 0, 'x', s1);
    expect(gameBoard.canPlaceShipAt(2, 0, 'x', s2.getLength())).toBe(true);
});

test('GameBoard - 9 - canPlaceShipAt should return true if all places required for it are empty and legal vertically', () => {
    let gameBoard = GameBoard(3);
    let s1 = Ship(2);
    let s2 = Ship(2);
    expect(gameBoard.canPlaceShipAt(0, 0, 'y', s1.getLength())).toBe(true);
    gameBoard.place(0, 0, 'y', s1);
    expect(gameBoard.canPlaceShipAt(0, 2, 'y', s2.getLength())).toBe(true);
});

test('GameBoard - 10 - canPlaceShipAt should return false if any place required for it is occupied', () => {
    let gameBoard = GameBoard(2);
    let s1 = Ship(1);
    let s2 = Ship(2);
    gameBoard.place(0, 1, 'x', s1);
    expect(gameBoard.canPlaceShipAt(0, 0, 'x', s2.getLength())).toBe(false);
});

test('GameBoard - 11 - canPlaceShipAt should return false if any place for it is out of the board horizontally', () => {
    let gameBoard = GameBoard(2);
    let s = Ship(2);
    expect(gameBoard.canPlaceShipAt(0, 1, 'x', s.getLength())).toBe(false);
});

test('GameBoard - 12 - canPlaceShipAt should return false if any place for it is out of the board vertically', () => {
    let gameBoard = GameBoard(2);
    let s = Ship(2);
    expect(gameBoard.canPlaceShipAt(1, 0, 'y', s.getLength())).toBe(false);
});
