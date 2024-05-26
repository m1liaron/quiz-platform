const express = require('express')
const router = express.Router()

const authorization = require('../middleware/authentication');

// create, delete, update quiz, get
const { createQuiz, updateQuiz, deleteQuiz, getQuiz} = require('../controllers/quizzes');

router.post('/', authorization, createQuiz);
router.use('/:id', authorization)
    .get(getQuiz)
    .put(updateQuiz)
    .delete(deleteQuiz);

module.exports = router;