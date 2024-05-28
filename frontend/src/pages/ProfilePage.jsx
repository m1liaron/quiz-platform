import {useEffect} from 'react';
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
        <div className='p-5'>
            <BackArrow/>
            {loading && (
                <AiOutlineLoading color='#000' size={40} />
            )}
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
                                <FaTrash size={20} color="#fff" onClick={() => onDeleteQuiz(quiz.quizId)} style={{cursor:'pointer'}}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;