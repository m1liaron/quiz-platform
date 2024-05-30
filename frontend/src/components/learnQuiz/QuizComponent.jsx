import { Card, Container, Row, Col } from 'react-bootstrap';
import { useState} from 'react';
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {createResult, selectResults} from "../../redux/resultSlice.js";
import {useNavigate} from "react-router-dom";

const QuizComponent = ({ quizzes }) => {
    const {results} = useSelector(selectResults);
    const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
    const [completedQuestions, setCompletedQuestions] = useState([]);
    const [answer, setAnswer] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!quizzes || !quizzes.questions) {
        return <p>No quizzes available.</p>;
    }

    const haveMoreQuestions = quizzes?.questions[selectedQuizIndex] ? quizzes?.questions[selectedQuizIndex] : null

    const handleClick = (index) => {
        setSelectedQuizIndex(index);
    };

    const saveAnswer = () => {
        const currentQuestion = quizzes?.questions[selectedQuizIndex];
        const currentQuestionId = currentQuestion?._id;

        if (!currentQuestionId) {
            console.log('Current question is not defined.');
            return;
        }

        // Find the index of the current question in the completedQuestions array
        const questionIndex = completedQuestions.findIndex(q => q._id === currentQuestionId);

        if (questionIndex === -1) {
            // Question not found in completedQuestions, add it
            const completedQuestion = {
                ...currentQuestion,
                userAnswer: answer
            };
            setCompletedQuestions(prevState => [...prevState, completedQuestion]);
            setSelectedQuizIndex(selectedQuizIndex + 1);
        } else {
            // Question found, update the userAnswer
            setCompletedQuestions(prevState => {
                const updatedQuestions = [...prevState];
                updatedQuestions[questionIndex] = {
                    ...updatedQuestions[questionIndex],
                    userAnswer: answer
                };
                return updatedQuestions;
            });
            console.log('Quiz was updated');
        }

        setAnswer('');
    };

    const finishQuiz = async () => {
        const resultedQuestions = completedQuestions?.map(question => {
            return {
                correct: question.userAnswer.toLowerCase() === question.answer.toLowerCase(),
                ...question
            }
        })

        const data = {
            title: quizzes.title,
            quizId: quizzes._id,
            image: quizzes.image,
            questions: resultedQuestions
        }

        await dispatch(createResult(data))
        navigate(`/result/${results._id}`)
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} className='mb-5'>
                    <Row>
                        {quizzes.questions.map((question, index) => (
                            <Col key={question._id} className="mb-2" xs={2}>
                                <Card
                                    className={`text-center ${selectedQuizIndex === index ? 'bg-primary' : 'bg-dark'} text-white`}
                                    onClick={() => handleClick(index)}
                                >
                                    <Card.Body>
                                        <h2>{index + 1}</h2>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <Col>
                            {haveMoreQuestions? (
                                <Card className="mt-4">
                                    <Card.Body>
                                        <Card.Title>Question {selectedQuizIndex + 1}</Card.Title>
                                        <Card.Text>
                                            {quizzes.questions[selectedQuizIndex].question}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ) : (
                                <p>No question selected.</p>
                            )}
                        </Col>
                    </Row>
                </Col>
                {haveMoreQuestions && (
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Відповідь"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </div>
                )}
                <Button
                    onClick={!haveMoreQuestions ? finishQuiz : saveAnswer}
                    disabled={!answer && haveMoreQuestions}
                >
                    {!haveMoreQuestions ? "Закінчити проходження" : "Зберегти відповідь"}
                </Button>
            </Row>
        </Container>
    );
};

export default QuizComponent;