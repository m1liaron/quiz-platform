import {useParams} from "react-router-dom";
import QuizComponent from "../components/learnQuiz/QuizComponent.jsx";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getQuiz, selectQuiz} from "../redux/quizSlice.js";
import BackArrow from "../components/BackArrow.jsx";
import LoadingComponent from "../components/LoadingComponent.jsx";

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
            {loading && <LoadingComponent/>}
            {error && <div className='bg-danger text-white'>{error}</div>}
            {quizzes && (
                <QuizComponent quizzes={quizzes}/>
            )}
        </>
    );
};

export default QuizLearnPage;