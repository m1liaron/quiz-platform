import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUser, selectUser} from "../redux/userSlice.js";
import {AiOutlineLoading} from "react-icons/ai";
import BackArrow from "../components/BackArrow.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {FaArrowLeft, FaTrash} from "react-icons/fa";
import {deleteQuiz} from "../redux/quizSlice.js";
import LoadingComponent from "../components/LoadingComponent.jsx";

const ProfilePage = () => {
    const {user, loading, error} = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getUser());
    }, []);

    const onDeleteQuiz = (id) => {
        dispatch(deleteQuiz({id}));
    }

    return (
        <div className='p-5'>
            <FaArrowLeft style={{cursor:'pointer'}} size={20} color="#000" onClick={() => navigate('/')}/>
            {loading && <LoadingComponent/>}
            {error && <div className='bg-danger text-white'>{error}</div>}
            {user && (
                <div>
                    <h1>{user.name}</h1>
                    <h2>Ваші вікторини:</h2>
                    <div className='d-flex justify-content-center gap-5'>
                        {user.own_quizzes.map(quiz => (
                            <div
                                key={quiz._id}
                                style={{borderRadius: 4}}
                                className="d-flex justify-content-between align-items-center gap-2 bg-dark text-white p-3 w-25 flex-wrap "
                            >
                                <NavLink to={`/quiz/${quiz.quizId}`}>
                                    <h3 className='text-white'>{quiz.title}</h3>
                                </NavLink>
                                <FaTrash size={20} color="#fff" onClick={() => onDeleteQuiz(quiz.quizId)}
                                         style={{cursor: 'pointer'}}/>
                            </div>
                        ))}
                    </div>
                    <h2>Пройдені вікторини:</h2>
                    <div className='d-flex justify-content-center gap-5'>
                        {user.completed_quizzes.map(quiz => (
                            <div
                                key={quiz._id}
                                style={{borderRadius: 4}}
                                className="d-flex justify-content-between align-items-center gap-2 bg-dark text-white p-3 w-25 flex-wrap "
                            >
                                <NavLink to={`/result/${quiz.resultId}`}>
                                    <h3 className='text-white'>{quiz.title}</h3>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;