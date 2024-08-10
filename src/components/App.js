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
import { useQuestion } from "../contexts/QuestionsContext";





export default function App() {
  

  useEffect(function(){
    fetch('http://localhost:8000/questions')
    .then((res) => res.json())
    .then((data) => dispatch({type:"dataReceived", payload: data}))
    .catch((err) => dispatch({type:"dataFailed"}))
  }, [])

  const {status, dispatch, answer, isLastQuestion} = useQuestion()

  return (
    <div className="app">
      <Header />

      <Main>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && <StartScreen  />}
      {status === 'active' && 
        <React.Fragment>
          <Progress  />
          <Question />
          <Footer>
            <Timer  />
          </Footer>
          {answer !== null && <button className='btn btn-ui' onClick={() => dispatch({type:`${isLastQuestion ? 'finish' : 'next'}`})}>{isLastQuestion ? 'Finish' : 'Next'}</button>
          }
        </React.Fragment>
        }
        {status === "finish" && 
          <React.Fragment>
            <FinishScreen  />
            <button className='btn' onClick={() => dispatch({type:'restart'})}>Restart</button>
          </React.Fragment>
        }
      </Main>
    </div>
  );
}