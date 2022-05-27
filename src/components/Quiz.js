import { useContext } from "react";
import Question from "./Question";
import { QuizContext } from "../context/quiz";

const Quiz = () => {
  const [quizState, dispatch] = useContext(QuizContext); // подписка на глобальный state
  // console.log('state', quizState);
  const {quetions, currentQuestionIndex, showResults, correctAnswersCount} = quizState;

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
      {!showResults &&
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
