// QuizProvider - это компонент, который будет предоставлять наши глобальные данные 
import { createContext, useReducer } from 'react';
import { shuffleAnswers, normalizeQuestions } from '../helpers';


const initialState = {
    quetions: [],
    currentQuestionIndex: 0,
    showResults: false,
    answers: [],
    currentAnswer: '',
    correctAnswersCount: 0,
    numberQustions: '8',
    category: '10',
    difficulty: '',
    loaded: false

};

const reducer = (state, action) => {
    // console.log('reducer', state, action);

    switch(action.type) {
        case 'SELECT_ANSWER': {
            const correctAnswersCount = action.payload === state.quetions[state.currentQuestionIndex].correctAnswer ? state.correctAnswersCount + 1 : state.correctAnswersCount; 
            return {
                ...state,
                currentAnswer: action.payload,
                correctAnswersCount
            }
        }
        case 'NEXT_QUESTION': {
            const showResults = state.currentQuestionIndex === state.quetions.length - 1;
            const currentQuestionIndex = showResults ? state.currentQuestionIndex : state.currentQuestionIndex + 1;
            const answers = showResults ? [] : shuffleAnswers(state.quetions[currentQuestionIndex]);
            return {
                ...state,
                currentQuestionIndex,
                showResults,
                answers,
                currentAnswer: ''
            };
        }
        case 'RESTART': {
            return initialState;
        }
        case 'LOADED_QUESTION': {
            console.log('LOADED_QUESTION', action.payload);
            const normalizedQuestions = normalizeQuestions(action.payload);
            return {
                ...state,
                quetions: normalizedQuestions,
                answers: shuffleAnswers(normalizedQuestions[0]),
            }
        }
        case 'SETTING_SUBMIT': {
            // console.log('SETTING_SUBMIT', action.payload);
            const numberQustions = action.payload.numberQustions;
            const category = action.payload.category;
            const difficulty = action.payload.difficulty;
            console.log('SETTING_SUBMIT', action.payload);
            return {
                ...state,
                numberQustions,
                category,
                difficulty,
                loaded: true,
            }
        }
        default: {
            return state;
        }
    }

}

export const QuizContext = createContext();
export const QuizProvider = ({children}) => {
    const value = useReducer(reducer, initialState); // [state, dispatch] 

    return (
        <QuizContext.Provider
            value={value}>
            {children}
        </QuizContext.Provider>
    )
}