import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUser, selectUser} from "../redux/userSlice.js";
import {AiOutlineLoading} from "react-icons/ai";
import BackArrow from "../components/BackArrow.jsx";
import {NavLink} from "react-router-dom";
import {FaTrash} from "react-icons/fa";
import {deleteQuiz} from "../redux/quizSlice.js";

const ProfilePage = () => {
    const {user, loading, error} = useSelector(selectUser);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, []);

    const onDeleteQuiz = (id) => {
        dispatch(deleteQuiz({id}));
    }

    return (
        <div>
            <BackArrow/>
            {loading && (
                <AiOutlineLoading color='#000' size={40} />
            )}
            {user && (
                <div>
                    <h1>{user.name}</h1>
                    <h2>Ваші вікторини</h2>
                    {user.own_quizzes.map(quiz => (
                        <div key={quiz._id} className="d-flex align-items-center gap-2">
                            <NavLink to={`/quiz/${quiz.quizId}`}>
                                <li>{quiz.title}</li>
                            </NavLink>
                            <FaTrash size={20} color="#000" onClick={() => onDeleteQuiz(quiz.quizId)} style={{cursor:'pointer'}}/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;