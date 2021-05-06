import Player from '../../factories/Player';
import Ship from '../../factories/Ship';

const p1 = Player(2);
const p2 = Player(2);
p1.setEnemy(p2);
p2.setEnemy(p1);
p2.board.place(0, 0, 'x', Ship(1));
p1.board.place(0, 0, 'x', Ship(1));
test('Player', () => {});
