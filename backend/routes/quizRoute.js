const express = require('express')
const router = express.Router()

const authorization = require('../middleware/authentication');

// create, delete, update quiz, get
const { createQuiz, updateQuiz, deleteQuiz, getQuiz, getAllQuiz} = require('../controllers/quizzes');

// router.post('/:id', authorization, createQuiz);

// Apply authorization middleware to all routes with /:id
router.use('/:id', authorization);

router.get('/', authorization, getAllQuiz)

router.route('/:id')
    .get(getQuiz)
    .post(createQuiz)
    .put(updateQuiz)
    .delete(deleteQuiz);

module.exports = router;