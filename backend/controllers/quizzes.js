const { StatusCodes } = require('http-status-codes');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

const createQuiz = async (req, res) => {
    try {
        const { title, questions } = req.body;

        const questionIds = [];

        for (const { question, answer } of questions) {
            // Створюємо новий об'єкт питання за допомогою конструктора new
            const newQuestion = new Question({ question, answer });
            await newQuestion.save();
            questionIds.push(newQuestion._id);
        }

        // Створюємо новий об'єкт квізу
        const newQuiz = new Quiz({ title, questions: questionIds });
        // Зберігаємо квіз у базі даних
        await newQuiz.save();

        res.status(StatusCodes.CREATED).json({ quiz: newQuiz });
    } catch (err){
        console.log(err.message);
        res.status(400).send({error: err.message});
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
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Quiz not found' });
        }

        res.status(StatusCodes.OK).json(updatedQuiz);
    } catch (err){
        console.log(err.message);
        res.status(400).send({error: err.message});
    }
}

const deleteQuiz = async (req, res) => {
    try {
        const { _id } = req.params;

        const findQuiz = await Quiz.findById(_id);
        if (!findQuiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        await Quiz.findByIdAndDelete(_id);

        res.status(StatusCodes.OK).json({message: "Quiz deleted successfully"});
    } catch (err){
        console.log(err.message);
        res.status(400).send({error: err.message});
    }
}

const getQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const quiz = await Quiz.findById(id).populate('questions');
        if(!quiz){
            return res.status(404).json({ error: `Quiz with id = ${id}, not found` });
        }

        res.status(200).json(quiz);
    } catch (err){
        console.log(err.message);
        res.status(400).send({error: err.message});
    }
}

module.exports = {
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuiz
}