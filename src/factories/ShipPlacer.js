import { GAME_BOARD_SIZE } from '../App';

const ShipPlacer = (player, originalShips, finished) => {
    const ships = [...originalShips];
    if (player.user === 'human') {
        const initialColor = 'aliceblue';
        const canBeUsedColor = 'yellowgreen';
        const canNotBeUsedColor = 'orange';
        const usedColor = 'green';
        let rotate = false;
        let lastRotate = false;
        let itr = 0;
        const changeColor = (start, shipLength) => {
            lastRotate = rotate;
            const shipDirection = rotate ? 'y' : 'x';
            const [y, x] = [
                Number(start.id[start.id.length - 2]),
                Number(start.id[start.id.length - 1]),
            ];
            const canUse = player.board.canPlaceShipAt(
                y,
                x,
                shipDirection,
                shipLength
            );
            const color = canUse ? canBeUsedColor : canNotBeUsedColor;
            if (shipDirection === 'x') {
                for (let i = x; i < shipLength + x && i < GAME_BOARD_SIZE; i++)
                    if (
                        document.querySelector('#human' + y + '' + i).style
                            .backgroundColor !== usedColor
                    )
                        document.querySelector(
                            '#human' + y + '' + i
                        ).style.backgroundColor = color;
            } else if (shipDirection === 'y') {
                for (let i = y; i < shipLength + y && i < GAME_BOARD_SIZE; i++)
                    if (
                        document.querySelector('#human' + i + '' + x).style
                            .backgroundColor !== usedColor
                    )
                        document.querySelector(
                            '#human' + i + '' + x
                        ).style.backgroundColor = color;
            }
        };
        const removeColor = (start, shipLength) => {
            const shipDirection = lastRotate ? 'y' : 'x';
            const [y, x] = [
                Number(start.id[start.id.length - 2]),
                Number(start.id[start.id.length - 1]),
            ];

            if (shipDirection === 'x') {
                for (let i = x; i < shipLength + x && i < GAME_BOARD_SIZE; i++)
                    if (
                        document.querySelector('#human' + y + '' + i).style
                            .backgroundColor !== usedColor
                    )
                        document.querySelector(
                            '#human' + y + '' + i
                        ).style.backgroundColor = initialColor;
            } else if (shipDirection === 'y') {
                for (let i = y; i < shipLength + y && i < GAME_BOARD_SIZE; i++)
                    if (
                        document.querySelector('#human' + i + '' + x).style
                            .backgroundColor !== usedColor
                    )
                        document.querySelector(
                            '#human' + i + '' + x
                        ).style.backgroundColor = initialColor;
            }
        };
        const placeShip = (start, ship) => {
            const shipDirection = lastRotate ? 'y' : 'x';
            const [y, x] = [
                Number(start.id[start.id.length - 2]),
                Number(start.id[start.id.length - 1]),
            ];
            const canUse = player.board.canPlaceShipAt(
                y,
                x,
                shipDirection,
                ship.getLength()
            );
            if (canUse) {
                player.board.place(y, x, shipDirection, ship);
                if (shipDirection === 'x') {
                    for (
                        let i = x;
                        i < ship.getLength() + x && i < GAME_BOARD_SIZE;
                        i++
                    ) {
                        document.querySelector(
                            '#human' + y + '' + i
                        ).style.backgroundColor = usedColor;
                    }
                } else if (shipDirection === 'y') {
                    for (
                        let i = y;
                        i < ship.getLength() + y && i < GAME_BOARD_SIZE;
                        i++
                    )
                        document.querySelector(
                            '#human' + i + '' + x
                        ).style.backgroundColor = usedColor;
                }
                itr++;
            }
        };
        const rotating = (e) => {
            if (e.key === 'r' || e.key === 'R');
            rotate = !rotate;
        };
        const board = document.querySelector('#human');
        const eventsHandler = (event) => {
            if (!ships[itr]) {
                board.removeEventListener('mouseover', eventsHandler, true);
                board.removeEventListener('mouseout', eventsHandler, true);
                board.removeEventListener('mouseup', eventsHandler, true);
                document.removeEventListener('keyup', eventsHandler, true);
                finished();
            } else
                switch (event.type) {
                    case 'mouseover':
                        if (ships[itr])
                            changeColor(event.target, ships[itr].getLength());
                        break;
                    case 'mouseout':
                        if (ships[itr])
                            removeColor(event.target, ships[itr].getLength());
                        break;
                    case 'mouseup':
                        if (ships[itr]) placeShip(event.target, ships[itr]);
                        break;
                    default:
                }
        };
        document.addEventListener('keyup', rotating);
        board.addEventListener('mouseover', eventsHandler, true);
        board.addEventListener('mouseout', eventsHandler, true);
        board.addEventListener('mouseup', eventsHandler, true);
    } else if (player.user === 'AI') {
        let itr = 0;
        while (ships[itr]) {
            let y, x;
            let rotate;
            let shipDirection;
            do {
                [y, x] = [
                    Math.floor(Math.random() * GAME_BOARD_SIZE),
                    Math.floor(Math.random() * GAME_BOARD_SIZE),
                ];
                rotate = Math.round(Math.random());
                shipDirection = rotate ? 'x' : 'y';
            } while (
                !player.board.canPlaceShipAt(
                    y,
                    x,
                    shipDirection,
                    ships[itr].getLength()
                )
            );
            player.board.place(y, x, shipDirection, ships[itr]);

            itr++;
        }
    }
};
export default ShipPlacer;
