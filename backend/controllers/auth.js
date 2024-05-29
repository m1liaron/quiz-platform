const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
    try{
        const { email } = req.body;
        const findUser = await User.findOne({email});
        if(findUser){
            return res.status(409).json({message: 'User already exists'});
        }

        const user = await User.create(req.body);
        const token = user.createJWT();

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'None', // Adjust as needed
            maxAge: 36000000 // 1 hour
        });
        res.status(StatusCodes.CREATED).json({
            user: { name: user.name, email: user.email }
        });
    } catch (err){
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: err.message})
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        }
        const token = user.createJWT();

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'Strict', // Adjust as needed
            maxAge: 36000000 // 1 hour
        });
        res.status(StatusCodes.CREATED).json({
            user: {name: user.name, email: user.email}})
    } catch (err){
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: err.message})
    }
}

module.exports = {
    register,
    login
}