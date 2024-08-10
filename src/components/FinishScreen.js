import React from 'react'
import { useQuestion } from '../contexts/QuestionsContext';

export default function FinishScreen() {
    const {points , allpoinst, highScore} = useQuestion();
    const percentage = (points / allpoinst) * 100;
    
    return (
        <React.Fragment>
            <p className='result'>
                You scored <strong>{points}</strong> from {allpoinst} ({Math.floor(percentage)}%)
            </p>
            <p className='highscore'>
                Your Heigh Score is {highScore}
            </p>
        </React.Fragment>
    )
}
