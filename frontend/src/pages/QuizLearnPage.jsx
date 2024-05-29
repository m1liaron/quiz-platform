import {useParams} from "react-router-dom";
import QuizComponent from "../components/learnQuiz/QuizComponent.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getQuiz, selectQuiz} from "../redux/quizSlice.js";
import BackArrow from "../components/BackArrow.jsx";

const QuizLearnPage = () => {
    const {quizzes, error, loading} = useSelector(selectQuiz);
    const {id} = useParams();

    const dispatch= useDispatch();
    useEffect(() => {
        dispatch(getQuiz({id}));
    }, []);

    return (
        <>
         <BackArrow/>
         <QuizComponent quizzes={quizzes}/>
        </>
    );
};

export default QuizLearnPage;