const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true
    },
    image: {
        type: String,
        default: 'https://viralsolutions.net/wp-content/uploads/2019/06/shutterstock_749036344.jpg'
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: [true, "Please provide a user's id, that own this quiz."]
    }
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;