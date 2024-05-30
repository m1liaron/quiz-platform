const mongoose = require('mongoose');
const {Mongoose} = require("mongoose");

const ResultSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    image: {
        type: String,
        default: 'https://viralsolutions.net/wp-content/uploads/2019/06/shutterstock_749036344.jpg'
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
    },
    questions: [
        {
            answer: String,
            correct: Boolean,
            question: String,
            userAnswer: String
        }
    ]
}, { timestamps: true });

const Result = mongoose.model('Result', ResultSchema);

module.exports = Result;