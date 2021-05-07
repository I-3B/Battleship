const AttacksHandler = (p1, p2) => {
    const humanAttacked = (cell) => {
        const [y, x] = [
            Number(cell.id[cell.id.length - 2]),
            Number(cell.id[cell.id.length - 1]),
        ];
        const board = p2.board;
        const state = board.checkCell(y, x);
        changeColor(cell, state);
        if (state === 'ship' || state === 'empty') {
            board.receiveAttack(y, x);
        } else if (state === 'attacked') {
        }
        return state;
    };
    const changeColor = (cell, state) => {
        if (state === 'ship')
            cell.setAttribute('style', 'background-color:red');
        else if (state === 'empty')
            cell.setAttribute('style', 'background-color:wheat');
    };
    const AIAttack = () => {
        let [y, x, state] = p2.AIAttack();
        while (state === 'attacked') {
            [y, x, state] = p2.AIAttack();
        }
        changeColor(document.querySelector('#' + p1.user + y + '' + x), state);
        while (
            (state === 'ship' || state === 'attacked') &&
            !p1.board.checkLose()
        ) {
            [y, x, state] = p2.AIAttack();
            changeColor(
                document.querySelector('#' + p1.user + y + '' + x),
                state
            );
        }
    };
    return {
        AIAttack,
        humanAttacked,
    };
};
export default AttacksHandler;
