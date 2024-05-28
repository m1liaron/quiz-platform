const { StatusCodes } = require('http-status-codes');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const User = require('../models/User');

const createQuiz = async (req, res) => {
    try {
        const { title, questions } = req.body;
        const userId = req.user.userId
        req.body.createdBy = userId;

        const questionIds = [];
        for (const { question, answer } of questions) {
            // Створюємо новий об'єкт питання за допомогою конструктора new
            const newQuestion = new Question({ question, answer });
            await newQuestion.save();
            questionIds.push(newQuestion._id);
        }

        // Створюємо новий об'єкт квізу
        const newQuiz = new Quiz({ title, questions: questionIds, createdBy: userId  });
        // Зберігаємо квіз у базі даних
        await newQuiz.save();

        const findUser = await User.findById(userId);
        if(!findUser){
            return res.status(401).json({message: `User with id: ${userId}, not found`});
        }

        const own_quiz = {
            quizId: newQuiz._id,
            title: newQuiz.title,
        }
        findUser.own_quizzes.push(own_quiz);
        await findUser.save();

        res.status(StatusCodes.CREATED).json({ quiz: newQuiz });
    } catch (err){
        console.log(err.message);
        res.status(400).send({message: err.message});
    }
}

const updateQuiz = async (req, res) => {
    try {
        const { _id } = req.params;

        const updatedQuiz = await Quiz.findOneAndUpdate(
            { _id},
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedQuiz) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Quiz not found' });
        }

        res.status(StatusCodes.OK).json(updatedQuiz);
    } catch (err){
        console.log(err.message);
        res.status(400).send({message: err.message});
    }
}

const deleteQuiz = async (req, res) => {
    try {
        const quizId = req.params.id
        const userId = req.user.userId

        const findQuiz = await Quiz.findById(quizId);
        if (!findQuiz) {
            return res.status(404).json({ message: `Quiz with id: ${quizId} not found` });
        }

        // Delete all questions associated with this quiz
        await Question.deleteMany({ _id: { $in: findQuiz.questions } });

        await Quiz.findByIdAndDelete(quizId);

        // Remove the quiz from the user's own_quizzes array
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { own_quizzes: {quizId} } },
            { new: true } // Return the updated document
        );
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: `User with id: ${userId} not found` });
        }

        res.status(StatusCodes.OK).json({ message: "Quiz and associated questions deleted successfully" });
    } catch (err){
        console.log(err.message);
        res.status(400).send({message: err.message});
    }
}

const getQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await Quiz.findById(id).populate('questions');
        if (!quiz) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: `Quiz with id = ${id} not found` });
        }

        res.status(200).json(quiz);
    } catch (err){
        console.log(err.message);
        res.status(400).send({message: err.message});
    }
}

const getAllQuiz = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('questions'); // Populate questions if needed
        res.status(StatusCodes.OK).json(quizzes);
    } catch (err){
        console.log(err.message);
        res.status(400).send({error: err.message});
    }
}


module.exports = {
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuiz,
    getAllQuiz
}