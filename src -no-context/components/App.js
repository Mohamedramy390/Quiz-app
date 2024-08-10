import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from './StartScreen'
import Question from "./Question";
import React, { useEffect, useReducer } from "react";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

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

export default function App() {

  
  const [{questions, status, index, answer, points, highScore, secondesRemaing}, dispatch] = useReducer(reducer, initialData)
  
  const questionsNum = questions.length

  const allPoints = questions.reduce((prev, curr) => prev + curr.points ,0)

  const isLastQuestion = index === questionsNum - 1;

  useEffect(function(){
    fetch('http://localhost:8000/questions')
    .then((res) => res.json())
    .then((data) => dispatch({type:"dataReceived", payload: data}))
    .catch((err) => dispatch({type:"dataFailed"}))
  }, [])

  return (
    <div className="app">
      <Header />

      <Main>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && <StartScreen questionsNum={questionsNum} dispatch={dispatch} />}
      {status === 'active' && 
        <React.Fragment>
          <Progress index={index} questionsNum={questionsNum} points={points} allPoints={allPoints} answer={answer} />
          <Question question={questions[index]} dispatch={dispatch} answer={answer} />
          <Footer>
            <Timer dispatch={dispatch} secondesRemaing={secondesRemaing} />
          </Footer>
          {answer !== null && <button className='btn btn-ui' onClick={() => dispatch({type:`${isLastQuestion ? 'finish' : 'next'}`})}>{isLastQuestion ? 'Finish' : 'Next'}</button>
          }
        </React.Fragment>
        }
        {status === "finish" && 
          <React.Fragment>
            <FinishScreen points={points} allpoinst={allPoints} highScore={highScore} />
            <button className='btn' onClick={() => dispatch({type:'restart'})}>Restart</button>
          </React.Fragment>
        }
      </Main>
    </div>
  );
}