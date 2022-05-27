// Используемый стэк: 
// React (функцональные компоненты, хуки)
// в качестве state manager: хук React useReducer

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Quiz from "./components/Quiz";
import { QuizProvider } from "./context/quiz";

ReactDOM.render(
  <React.StrictMode>
    <QuizProvider>
      <Quiz /> 
    </QuizProvider>  
  </React.StrictMode>,
  document.getElementById("root")
);
