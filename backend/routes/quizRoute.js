const express = require('express')
const router = express.Router()

const authorization = require('../middleware/authentication');

// create, delete, update quiz, get
const { createQuiz, updateQuiz, deleteQuiz, getQuiz, getAllQuiz} = require('../controllers/quizzes');

// router.post('/:id', authorization, createQuiz);

// Apply authorization middleware to all routes with /:id
router.use('/:id', authorization);
router.use('/', authorization);

router.route('/')
    .get(getAllQuiz)
    .post(createQuiz)

router.route('/:id')
    .get(getQuiz)
    .put(updateQuiz)
    .delete(deleteQuiz);

module.exports = router;