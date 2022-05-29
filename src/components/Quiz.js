import { useContext } from "react";
import Question from "./Question";
import { QuizContext } from "../context/quiz";
import { useEffect } from "react";

const Quiz = () => {
  const [quizState, dispatch] = useContext(QuizContext); // подписка на глобальный state
  const apiURL = 'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986';
  // const getAllquestion = async (url) => {
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   console.log(data);
  //   console.log(data.results);
  //   return data.results;
  // }
  
  const {quetions, currentQuestionIndex, showResults, correctAnswersCount} = quizState;
  useEffect(() => {
    if(quetions.length > 0) {
      return;
    }
    fetch(apiURL).then(res => res.json()).then(data => {
      console.log('data', data);
      dispatch({type: 'LOADED_QUESTION', payload: data.results})
    })
  })
  console.log('state', quizState);

  return (
    <div className="quiz">
      {showResults &&
        (
          <div className="results">
            <div className="congratulations">Congratulations</div>
            <div className="results-info">
              <div>You have complete the quiz</div>
              <div>You've got {correctAnswersCount} of {quetions.length}</div>
              <div className="next-button" 
                   onClick={() => dispatch({type: 'RESTART'})}>Restart</div>
            </div>
          </div>
        )
      }
      {!showResults && quizState.quetions.length > 0 &&
        (<div>
          <div className="score">Question {currentQuestionIndex + 1}/{quetions.length}</div>
          <Question />
          <div className="next-button"
              onClick={() => {dispatch({type: 'NEXT_QUESTION'})}}>Next question</div>
        </div>)
      }
    </div>    
  );
};

export default Quiz;
