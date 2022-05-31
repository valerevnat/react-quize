import { useContext } from "react";
import Question from "./Question";
import { QuizContext } from "../context/quiz";
// import { useEffect } from "react";
import QuizSettings from "./QuizSettings";

const Quiz = () => {

  const [quizState, dispatch] = useContext(QuizContext); // подписка на глобальный state
  const {quetions, currentQuestionIndex, showResults, correctAnswersCount, loaded} = quizState;

  return (
    <div className="quiz">
      {!loaded &&
        <QuizSettings />}
      {/* <QuizSettings /> */}
      {showResults && loaded &&
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
      {!showResults && quizState.quetions.length > 0 && loaded &&
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
