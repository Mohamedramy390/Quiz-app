import React from 'react'

export default function Options({question, dispatch, answer}) {
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
