import {useEffect, useState} from "react";
import BackArrow from "../components/BackArrow.jsx";
import Button from "react-bootstrap/Button";
import {toast, ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {createQuiz, selectQuiz} from "../redux/quizSlice.js";
import {useNavigate} from "react-router-dom";
import {Image} from "react-bootstrap";

const CreateQuizPage = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [questions, setQuestions] = useState([{
        question: 'What ... you done?',
        answer: 'have'
    }]);
    const {quizzes, error, loading} = useSelector(selectQuiz);

    const defaultQuestion = {
        question: `Питання ${questions.length}`,
        answer: `Відповідь ${questions.length}`
    }
    const addQuestion = (question = {}) => {
        setQuestions((prevQuestions) => [...prevQuestions, question]);
    }

    const changeQuestion = (e, index, field) => {
        const newQuestions = questions.map((q, i) => {
            if (i === index) {
                return { ...q, [field]: e.target.value };
            }
            return q;
        });
        setQuestions(newQuestions);
    };

    useEffect(() => {
        toast.error(error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
        })
    }, [error]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onCreateQuiz = () => {
        const quizData = {
            title,
            questions: [
                ...questions
            ]
        }
        dispatch(createQuiz(quizData));
        navigate('/')
    }

    return (
        <>
            <ToastContainer />
            <BackArrow/>
            <div>
                <div className="input-group mb-3 p-5">
                    <input
                        type="text"
                        className="form-control me-2 border-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Назва вікторини..."
                    />
                </div>
                <div className="input-group mb-3 p-5">
                    <input
                        type='file'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <img src={image}/>
                    <p>{image}</p>
                </div>
                <div className='p-5 mb-3'>
                    {questions?.map((question, index) => (
                        <div key={index} className='d-flex justify-content-between align-items-center bg-dark p-3 mb-2'>
                            <input
                                value={question.question}
                                onChange={(e) => changeQuestion(e, index, 'question')}
                                className="form-control me-2"
                            />
                            <input
                                value={question.answer}
                                onChange={(e) => changeQuestion(e, index, 'answer')}
                                className="form-control me-2"
                            />
                        </div>
                    ))}
                </div>
                <Button onClick={() => addQuestion(defaultQuestion)} className='mb-2'>
                    Додати питання
                </Button>
            </div>
            <Button onClick={onCreateQuiz}>
                Створити
            </Button>
        </>
    );
};

export default CreateQuizPage;