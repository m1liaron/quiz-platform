const express = require('express')
const router = express.Router()

const authorization = require('../middleware/authentication');
const { getUserData, updateUser} = require('../controllers/users');

router.use('/', authorization);
router.route('/')
    .get(getUserData)
    .put(updateUser)

module.exports = router;