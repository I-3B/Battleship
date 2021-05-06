import { useEffect, useState } from 'react';
import { GAME_BOARD_SIZE } from '../App';
import '../style/BoardDom.css';
import CellDom from './CellDom';

const Board = (props) => {
    const [cells, setCells] = useState([]);

    useEffect(() => {
        let arr = [];
        for (let i = 0; i < GAME_BOARD_SIZE; i++)
            for (let j = 0; j < GAME_BOARD_SIZE; j++)
                arr.push(
                    <CellDom
                        key={props.player.user + i + '' + j}
                        id={props.player.user + i + '' + j}
                    ></CellDom>
                );
        setCells(arr);
    }, []);
    return (
        <div
            id={props.player.user}
            className="board"
            onMouseUp={(event) => {
                if (props.gameStarted) props.boardClickedAt(event.target);
            }}
        >
            {cells}
        </div>
    );
};
export default Board;
