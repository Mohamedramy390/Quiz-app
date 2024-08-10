import React from 'react'

export default function Progress({index, questionsNum, points, allPoints, answer}) {
    return (
        <header className='progress'>
        <progress max={questionsNum} value={index + Number(answer !== null)} />
            <p>Question <strong>{index + 1}</strong>/ {questionsNum}</p>
            <p>Points {points} / {allPoints}</p>
        </header>
    )
}
