import React from 'react'
import { useQuestion } from '../contexts/QuestionsContext';

export default function Options() {

    const {question, dispatch, answer} = useQuestion()
    const hasAnswered = answer !== null;
    return (
        <div className='options'>
            {question.options.map((q, index) => 
                <button className={`btn btn-option ${index === answer ? 'answer' : "" }
                    ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ''}`} 
                    key={q}
                    onClick={() => dispatch({type:"newAnswer" , payload : index})}
                    disabled={hasAnswered}
                    >{q}
                    </button>
            )}
        </div>
    )
}
