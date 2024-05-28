import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getQuiz, selectQuiz} from "../redux/quizSlice.js";
import BackArrow from "../components/BackArrow.jsx";
import Button from "react-bootstrap/Button";
import LoadingComponent from "../components/LoadingComponent.jsx";
import {FaPen} from "react-icons/fa";
import {getUser, selectUser} from "../redux/userSlice.js";

const QuizPage = () => {
    const {quizzes, error, loading} = useSelector(selectQuiz);
    const {user} = useSelector(selectUser);
    const {id} = useParams();
    const [isEditMode, setEditMode] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getQuiz({id}))
    }, []);

    useEffect(() => {
        dispatch(getUser());
    }, []);
    const isOwner = user._id === quizzes.createdBy;

    return (
        <div>
            {loading && <LoadingComponent/>}
            {error && <p>Error: {error}</p>}

            {quizzes && (
                <>
                    <div className='p-3 d-flex gap-5 align-items-center'>
                        <BackArrow/>
                        <div className='d-flex align-items-center gap-2'>
                            <h1>{quizzes.title}</h1>
                            {isOwner && (
                                <FaPen size={20} color="#000" style={{cursor: 'pointer'}} onClick={() => setEditMode(!isEditMode)}/>
                            )}
                        </div>
                        <Button>Почати</Button>
                    </div>
                    <div className='m-5'>
                        {quizzes.questions?.map((question) => (
                            <div key={question._id} className='p-2 mb-2'
                                 style={{backgroundColor: 'gray', borderRadius: 5}}>
                                {!isEditMode ? (
                                    <h2 className='text-white'>{question.question}</h2>
                                ) : (
                                    <input

                                    />
                                )}

                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default QuizPage;