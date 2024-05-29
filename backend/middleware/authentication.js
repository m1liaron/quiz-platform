const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Authentication invalid' });
    }

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        const user = User.findById(payload.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Authentication invalid' });
        }
        req.user = user;
        req.user = { userId: payload.userId, name: payload.name };

        next()
    } catch(err){
        console.log('Authentication invalid:', err);
    }
}

module.exports = auth;