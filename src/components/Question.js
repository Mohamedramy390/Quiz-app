import React from 'react'
import Options from './Options'
import { useQuestion } from '../contexts/QuestionsContext'

export default function Question() {

    const {question, dispatch, answer} = useQuestion()
    
    return (
        <div>
            <h2>{question.question}</h2>
            <Options />
        </div>
    )
}
