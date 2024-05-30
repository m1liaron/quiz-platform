const express = require('express')
const router = express.Router()

const authorization = require('../middleware/authentication');
const { createResult, getResult} = require('../controllers/result');

// Apply authorization middleware to all routes with /:id
router.post('/', authorization, createResult)
router.get('/:id', authorization, getResult)

module.exports = router;