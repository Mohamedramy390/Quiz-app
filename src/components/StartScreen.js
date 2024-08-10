import React from 'react'
import { useQuestion } from '../contexts/QuestionsContext'

export default function StartScreen() {

    const {questionsNum, dispatch} = useQuestion()
return (
    <div className='start'>
        <h2>Welcome to The React Quiz</h2>
        <h3>{questionsNum} questions to test your react</h3>
        <button className='btn' onClick={() => dispatch({type:'start'})} >Let's start</button>
    </div>
)
}
