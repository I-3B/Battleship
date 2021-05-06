import Ship from '../../factories/Ship';

test('Ship - 1 - getLength should return the same lenght passed', () => {
    expect(Ship(100).getLength()).toBe(100);
});

test('Ship - 2 - hit function', () => {
    let ship = Ship(3);
    expect(ship.getHits()).toStrictEqual([false, false, false]);
    ship.hitAt(1);
    expect(ship.getHits()).toStrictEqual([false, true, false]);
});
test('Ship - 3 - isSunk for a ship with three states (new ship, half damage, full damage)', () => {
    let ship = Ship(4);
    expect(ship.isSunk()).toBe(false);
    ship.hitAt(0);
    ship.hitAt(3);
    expect(ship.isSunk()).toBe(false);
    ship.hitAt(1);
    ship.hitAt(2);
    expect(ship.isSunk()).toBe(true);
});

test('Ship - 4 - setting coordinate for a ship', () => {
    let ship = Ship(2);
    expect(ship.getCoordinate()).toStrictEqual({});
    ship.setCoordinate(1, 'x');
    expect(ship.getCoordinate()).toStrictEqual({ start: 1, direction: 'x' });
});
