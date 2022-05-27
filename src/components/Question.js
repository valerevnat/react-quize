import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import Answer from "./Answer";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  // console.log('state', quizState);
  const currentQuestion = quizState.quetions[quizState.currentQuestionIndex];

  return (
    <div>
      <div className="question">{currentQuestion.question}</div>
      <div className="answers">
        {
          quizState.answers.map((answer, i) => ( 
            <Answer key={i} 
                    index={i}
                    answerText={answer} 
                    correctAnswer={currentQuestion.correctAnswer}
                    currentAnswer={quizState.currentAnswer}
                    onSelectAnswer={(answerText) => dispatch({type: 'SELECT_ANSWER', payload: answerText})} />
          ))
        }
      </div>
    </div>
  );
};

export default Question;

