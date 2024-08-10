import React, { useEffect } from 'react'

export default function Timer({dispatch, secondesRemaing}) {

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
