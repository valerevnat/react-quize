import { useContext } from "react";
import Question from "./Question";
import { QuizContext } from "../context/quiz";
import { useEffect } from "react";
import QuizSettings from "./QuizSettings";

const Quiz = () => {

  const [quizState, dispatch] = useContext(QuizContext); // подписка на глобальный state
  const {quetions, currentQuestionIndex, showResults, correctAnswersCount, numberQustions, category, difficulty, loaded} = quizState;

  const categoryURL = category !== '' ? `&category=${category}` : '';
  const difficultyURL = difficulty !== '' ? `&difficulty=${difficulty}` : '';

  const apiURLNew = `https://opentdb.com/api.php?amount=${numberQustions}${categoryURL}${difficultyURL}&type=multiple&encode=url3986`;
  // console.log(apiURLNew);
  

  useEffect(() => {
    if(numberQustions === '7') {
      return;
    }
    fetch(apiURLNew).then(res => res.json()).then(data => {
      console.log('data', data);
      dispatch({type: 'LOADED_QUESTION', payload: data.results})
    })
  }, [numberQustions]);
  
  // Added dependency in useEffect and functionality (selection of the number of questions, categories and difficulty)

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
