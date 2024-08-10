import React, { useEffect } from 'react'
import { useQuestion } from '../contexts/QuestionsContext'

export default function Timer() {

    const {dispatch, secondesRemaing} = useQuestion()

    useEffect(function(){
        const id  = setInterval(function(){
            dispatch({type:"tick"})
        }, 1000)
        
        return () => clearInterval(id);
    }, [dispatch])


    return (
        <div className='timer'>
            {secondesRemaing}
        </div>
    )
}
