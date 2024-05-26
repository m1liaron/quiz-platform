const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Authentication invalid');
    }

    const token = authHeader.split(' ')[1];

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        const user = User.findById(payload.id).select('-password');
        req.user = user;

        req.user = { userId: payload.userId, name: payload.name };

        next()
    } catch(err){
        console.log('Authentication invalid:', err);
    }
}

module.exports = auth;