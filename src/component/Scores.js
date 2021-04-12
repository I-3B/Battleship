import { useEffect, useState } from 'react';
import '../style/Scores.css';
const Scores = (props) => {
    const [animationClassScore, setAnimationClassScore] = useState('');
    const [animationClassBestScore, setAnimationClassBestScore] = useState('');
    useEffect(() => {
        setAnimationClassScore('text-animation');
        setTimeout(() => {
            setAnimationClassScore('');
        }, 100);
    }, [props.score]);
    useEffect(() => {
        setAnimationClassBestScore('text-animation');
        setTimeout(() => {
            setAnimationClassBestScore('');
        }, 100);
    }, [props.bestScore]);
    return (
        <div id="scores">
            <div id="best-score">
                HS:{' '}
                <span className={animationClassBestScore}>
                    {' '}
                    {props.bestScore}
                </span>
            </div>
            <div id="current-score">
                Score:
                <span className={animationClassScore}> {props.score}</span>
            </div>
        </div>
    );
};
export default Scores;
