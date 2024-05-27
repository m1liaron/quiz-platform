const express = require('express')
const router = express.Router()

const authorization = require('../middleware/authentication');
const { getUserData } = require('../controllers/users');

router.get('/', authorization, getUserData);

module.exports = router;