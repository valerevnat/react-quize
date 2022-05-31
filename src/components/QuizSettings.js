import { Formik, Field, Form } from 'formik';
import { useContext } from "react";
import { QuizContext } from "../context/quiz";

const QuizSettings = () => {

    const [quizState, dispatch] = useContext(QuizContext);
    const {numberQustions, category, difficulty} = quizState;
    console.log('Данные из values', numberQustions, category, difficulty);

    
    return (
        <div>
            <div className='question setting-title'>
                Please select the settings for the quiz
            </div>
            <div>
                <Formik
                initialValues={{
                    numberQustions: '8',
                    category: '',
                    difficulty: ''

                }}
                onSubmit={values => {
                    // console.log(values);
                    
                    dispatch({type: 'SETTING_SUBMIT', payload: values})
                }}>

                    <Form>
                        <label htmlFor="location">Number of Questions (min 8 - max 20):</label>
                        <Field
                            component="input"
                            type='number'
                            id="numberQustions"
                            name="numberQustions"
                            min='8'
                            max='20'
                            className='setting setting-list'    
                        >
                        </Field> 

                        <label htmlFor="location">Select Category:</label>
                        <Field
                            component="select"
                            id="category"
                            name="category"
                            // multiple={true}
                            className='setting setting-list'
                        >
                            <option value="10">Any Category</option>
                            <option value="9">General Knowledge</option>
                            <option value="11">Entertainment: Film</option>
                            <option value="12">Entertainment: Music</option>
                            <option value="13">Entertainment: Musicals & Theatres</option>
                            <option value="14">Entertainment: Television</option>
                            <option value="15">Entertainment: Video Games</option>
                            <option value="16">Entertainment: Board Games</option>
                            <option value="17">Science & Nature</option>
                            <option value="18">Science: Computers</option>
                            <option value="19">Science: Mathematics</option>
                            <option value="20">Mythology</option>
                            <option value="21">Sports</option>
                            <option value="22">Geography</option>
                            <option value="23">History</option>
                            <option value="24">Politics</option>
                            <option value="25">Art</option>
                            <option value="26">Celebrities</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicles</option>
                            <option value="29">Entertainment: Comics</option>
                            <option value="30">Science: Gadgets</option>
                            <option value="31">Entertainment: Japanese Anime & Manga</option>
                            <option value="32">Entertainment: Cartoon & Animations</option>
                        </Field> 

                        <label htmlFor="location">Select Difficulty:</label>
                        <Field
                            component="select"
                            id="difficulty"
                            name="difficulty"
                            // multiple={true}
                            className='setting setting-list'
                        >
                            <option value="Any Difficulty">Any Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </Field> 
                        <button type="submit"
                                className="next-button">Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
  
};


export default QuizSettings;

