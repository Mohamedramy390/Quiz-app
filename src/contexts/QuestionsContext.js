// questionsNum
// dispatch

import { createContext, useContext, useReducer } from "react";

/*
index
points
allPoints
answer
secondesRemaing
status
highScore
*/ 
const QuestionsContext = createContext()

const initialData = {
    questions : [],
    status : "loading",
    index : 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondesRemaing: null,
}


function reducer(state, action){
    switch(action.type){
        case "dataReceived":
            return{
            ...state,
            questions: action.payload,
            status: "ready"
            }
        case "dataFailed":
            return{
            ...state,
            status: "error"
            }
        case "start":
            return {
            ...state,
            status: 'active',
            secondesRemaing : state.questions.length * 10
            }
        case "next":
            return{
            ...state,
            index : state.index + 1,
            answer: null,
            }
        case "newAnswer":
            const question = state.questions.at(state.index)
            return{
            ...state,
            answer: action.payload,
            points : action.payload === question.correctOption ? state.points + question.points : state.points,
            }
        case 'finish':
            return{
            ...state,
            status: 'finish',
            highScore : state.highScore < state.points ? state.points : state.highScore,
            }
        case 'restart':
            return{
            ...initialData,
            questions : state.questions,
            status: 'ready',
            }
        case 'tick':
            return{
            ...state,
            secondesRemaing: state.secondesRemaing - 1,
            status : state.secondesRemaing === 0 ? 'finish' : state.status
            }
        default : return state;
    }
}

function QuestionsProvider({children}){

    const [{questions, status, index, answer, points, highScore, secondesRemaing}, dispatch] = useReducer(reducer, initialData)

    const questionsNum = questions.length
    const allPoints = questions.reduce((prev, curr) => prev + curr.points ,0)
    const isLastQuestion = index === questionsNum - 1;
    const  question = questions[index];

    return <QuestionsContext.Provider 
        value={{
            questions, 
            status, 
            index, 
            answer, 
            points, 
            highScore, 
            secondesRemaing,
            allPoints,
            isLastQuestion,
            questionsNum,
            question,
            dispatch,
        }}
        >
            {children}
        </QuestionsContext.Provider>
}

function useQuestion(){
    const context = useContext(QuestionsContext)
    if(context === undefined) throw new Error("context used outside")
    return context;
}

export {QuestionsProvider, useQuestion}