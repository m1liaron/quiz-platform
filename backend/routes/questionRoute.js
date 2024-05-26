const express = require('express')
const router = express.Router()

const { updateQuestion, deleteQuestion } = require('../controllers/questions');

router.route('/:id')
    .put(updateQuestion)
    .delete(deleteQuestion)

module.exports = router;