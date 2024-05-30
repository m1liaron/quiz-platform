import { useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getResult, selectResults } from "../redux/resultSlice.js";
import Button from "react-bootstrap/Button";
import LoadingComponent from "../components/LoadingComponent.jsx";
import {FaArrowLeft} from "react-icons/fa";

const ResultPage = () => {
    const { id } = useParams();
    const { results, error, loading } = useSelector(selectResults);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getResult(id));
    }, [dispatch, id]);

    return (
        <div>
            {loading && <LoadingComponent />}
            {error && <div className='bg-danger text-white'>{error}</div>}
            {results && !loading && (
                <>
                    <div className='d-flex justify-content-center gap-5 align-items-center'>
                        <FaArrowLeft style={{cursor:'pointer'}} size={20} color="#000" onClick={() => navigate('/profile')}/>
                        <div className='d-flex align-items-center gap-2'>
                            <h2>{results.title}</h2>
                            <Button>Пройти ще раз</Button>
                        </div>
                    </div>
                    <div style={{ paddingTop: 50 }} className="d-flex justify-content-center align-items-center flex-wrap w-100">
                        {results.questions?.map(question => (
                            <div key={question._id} className='d-flex flex-column align-items-center mb-3 w-100'>
                                <div
                                    style={{
                                        width: '2rem',
                                        height: '2rem',
                                        borderRadius: 50,
                                        backgroundColor: question.correct ? "#00FF0A" : "#FF000F",
                                        border: '5px solid #000',
                                        marginBottom: '10px',
                                    }}
                                ></div>

                                <div
                                    style={{
                                        padding: '20px',
                                        borderRadius: 5,
                                        border: '7px solid #000',
                                        backgroundColor: question.correct ? "#00FF0A" : "#FF000F",
                                        width: '100%',
                                        maxWidth: '600px', // Adjust the max-width as needed
                                    }}
                                    className="d-flex flex-column gap-4"
                                >
                                    <div style={{ backgroundColor: '#595959', borderRadius: 2, padding: '10px' }}>
                                        <p className='text-white' style={{ fontSize: 30, textAlign: 'center' }}>{question.question}</p>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <p style={{ color: "#797979", fontSize: 25 }}>Ваша відповідь:</p>
                                        <div style={{ backgroundColor: '#B3B0B0', borderRadius: 2, padding: '10px', marginLeft: '10px' }}>
                                            <p className='text-white' style={{ fontSize: 30 }}>{question.userAnswer}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ResultPage;