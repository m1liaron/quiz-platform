import { Card, Container, Row, Col } from 'react-bootstrap';
import { useState} from 'react';
import Button from "react-bootstrap/Button";
import {useDispatch} from "react-redux";
import {updateUser} from "../../redux/userSlice.js";

const QuizComponent = ({ quizzes }) => {
    const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
    const [completedQuestions, setCompletedQuestions] = useState([]);
    const [answer, setAnswer] = useState('');
    const [showResults, setShowResults] = useState(false);
    const dispatch = useDispatch();

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

    const finishQuiz = () => {
        const resultedQuestions = completedQuestions?.map(question => {
            return {
                correct: question.userAnswer.toLowerCase() === question.answer.toLowerCase(),
                ...question
            }
        })

        const data = {
            completed_quizzes: resultedQuestions
        }
        setShowResults(true);
        dispatch(updateUser({data}))
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
                >
                    {!haveMoreQuestions ? "Закінчити проходження" : "Зберегти відповідь"}
                </Button>
            </Row>
            {showResults && (
                <Results quizzes={completedQuestions}/>
            )}
        </Container>
    );
};

const Results = ({quizzes}) => {
    const resultedQuestions = quizzes.map(question => {
        return {
            correct: question.userAnswer.toLowerCase() === question.answer.toLowerCase(),
            ...question
        }
    })

    return (
        <div>
            {quizzes && (
                <>
                    {resultedQuestions && resultedQuestions.map((question) => (
                        <div style={{ backgroundColor: question.correct ? "green" : "red" }} key={question._id}>
                            <h2>{question.question}</h2>
                            <h3>{question.userAnswer}</h3>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default QuizComponent;