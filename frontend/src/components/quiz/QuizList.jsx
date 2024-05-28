import noQuizImage from "../../assets/images/quiz-template.jpg";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUser, selectUser} from "../../redux/userSlice.js";
import {useEffect} from "react";

const QuizList = ({quizzes}) => {
    const {user} = useSelector(selectUser);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, []);

    const isOwner = (quizOwnerId) => {
        return user._id === quizOwnerId ? "Own" : ""
    }


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
                    <h1 className='text-end'>{isOwner(quiz.createdBy)}</h1>
                </div>
            ))}
        </>
    );
};

export default QuizList;