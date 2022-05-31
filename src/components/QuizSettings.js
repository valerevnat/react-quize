import { Formik, Field, Form } from 'formik';
import { useContext } from "react";
import { QuizContext } from "../context/quiz";

const QuizSettings = () => {

    const dictionaryCategories = [
        {'Any Category': '10'},
        {'General Knowledge': '9'},
        {'Entertainment: Film' : '11'},
        {'Entertainment: Music': '12'},
        {'Entertainment: Musicals & Theatres': '13'},
        {'Entertainment: Television': '14'},
        {'Entertainment: Video Games': '15'},
        {'Entertainment: Board Games': '16'},
        {'Science & Nature': '17'},
        {'Science: Computers': '18'},
        {'Science: Mathematics': '19'},
        {'Mythology': '20'},
        {'Sports': '21'},
        {'Geography': '22'},
        {'History': '23'},
        {'Politics': '24'},
        {'Art': '25'},
        {'Celebrities': '26'},
        {'Animals': '27'},
        {'Vehicles': '28'},
        {'Entertainment: Comics': '29'},
        {'Science: Gadgets': '30'},
        {'Entertainment: Japanese Anime & Manga': '31'},
        {'Entertainment: Cartoon & Animations': '32'},
    ]

    const dictionaryDifficulty = [
        {'Any Difficulty': ''}, 
        {Easy: 'easy'}, 
        {Medium: 'medium'}, 
        {Hard: 'hard'}
    ]

    const elementsCategories = dictionaryCategories.map((item, i) => {
        const keys = Object.keys(item);
        const values = Object.values(item);
        return (
            <option value={values}
                    key={i}>{keys}</option>
        )
    })

    const elementsDifficulty = dictionaryDifficulty.map((item, i) => {
        const keys = Object.keys(item);
        const values = Object.values(item);
        return (
            <option value={values}
                    key={i}>{keys}</option>
        )
    })
    // const elementsCategories = elementsOption(dictionaryCategories)
    // const elementsDifficulty = elementsOption(dictionaryDifficulty)

    const [quizState, dispatch] = useContext(QuizContext);

    const fetchData = ({numberQustions, category, difficulty}) => {
        const categoryURL = category !== '' ? `&category=${category}` : '';
        const difficultyURL = difficulty !== '' ? `&difficulty=${difficulty}` : '';
        const apiURLNew = `https://opentdb.com/api.php?amount=${numberQustions}${categoryURL}${difficultyURL}&type=multiple&encode=url3986`;

        fetch(apiURLNew).then(res => res.json()).then(data => {
            // console.log('data', data);
            dispatch({type: 'LOADED_QUESTION', payload: data.results});
        })
    }
        
    
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
                    fetchData(values)
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
                            {elementsCategories}
                        </Field> 

                        <label htmlFor="location">Select Difficulty:</label>
                        <Field
                            component="select"
                            id="difficulty"
                            name="difficulty"
                            // multiple={true}
                            className='setting setting-list'
                        >
                            {elementsDifficulty}
                            {/* <option value="Any Difficulty">Any Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option> */}
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

