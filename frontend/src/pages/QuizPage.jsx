import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getQuiz, selectQuiz} from "../redux/quizSlice.js";
import BackArrow from "../components/BackArrow.jsx";
import Button from "react-bootstrap/Button";
import LoadingComponent from "../components/LoadingComponent.jsx";

const QuizPage = () => {
    const {quizzes, error, loading} = useSelector(selectQuiz);
    const {id} = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuiz({id}))
    }, []);

    return (
        <div>
            {loading && <LoadingComponent/>}
            {error && <p>Error: {error}</p>}

            {quizzes && (
                <>
                    <div className='p-3 d-flex gap-5 align-items-center'>
                        <BackArrow/>
                        <h1>{quizzes.title}</h1>
                        <Button>Почати</Button>
                    </div>
                    <div className='m-5'>
                        {quizzes.questions?.map((question) => (
                            <div key={question._id} className='p-2 mb-2'
                                 style={{backgroundColor: 'gray', borderRadius: 5}}>
                                <h2 className='text-white'>{question.question}</h2>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default QuizPage;