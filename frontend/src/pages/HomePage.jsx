import Header from "../components/home/Header.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllQuiz, selectQuiz} from "../redux/quizSlice.js";
import LoadingComponent from "../components/LoadingComponent.jsx";
import QuizList from "../components/quiz/QuizList.jsx";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const {quizzes, error, loading} = useSelector(selectQuiz);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllQuiz())
    }, []);

    const navigate = useNavigate();
    return (
        <div>
            <Header/>

            <div onClick={() => navigate('/quiz/edit')}>
                <Button>Створити вікторину.</Button>
            </div>

            {loading && <LoadingComponent/>}
            {error && <p>Error: {error}</p>}
            {quizzes.length && (
                <div className='p-5 flex-wrap'>
                    <QuizList quizzes={quizzes} />
                </div>
            )}
        </div>
    );
};

export default HomePage;