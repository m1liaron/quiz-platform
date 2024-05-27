import noQuizImage from "../../assets/images/quiz-template.jpg";
import {useNavigate} from "react-router-dom";

const QuizList = ({quizzes}) => {
    const navigator = useNavigate();
    return (
        <>
            {quizzes.map(quiz => (
                <div
                    key={quiz._id}
                    style={{border: '4px solid gray', borderRadius: 5, cursor: 'pointer', width: '355px'}}
                    onClick={() => navigator(`/quiz/${quiz._id}`)}
                >
                    <img
                        src={noQuizImage}
                        alt='quiz image'
                        className="w-100"
                    />
                    <h1 className='text-center'>{quiz.title}</h1>
                </div>
            ))}
        </>
    );
};

export default QuizList;