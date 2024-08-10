import React from 'react'
import { useQuestion } from '../contexts/QuestionsContext'

export default function Progress() {

    const {index, questionsNum, points, allPoints, answer} = useQuestion();
    
    return (
        <header className='progress'>
        <progress max={questionsNum} value={index + Number(answer !== null)} />
            <p>Question <strong>{index + 1}</strong>/ {questionsNum}</p>
            <p>Points {points} / {allPoints}</p>
        </header>
    )
}
