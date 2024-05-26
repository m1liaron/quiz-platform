const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
    try{
        const { email } = req.body;
        const findUser = await User.findOne({email});
        if(findUser){
            return res.status(409).json({error: 'User already exists'});
        }

        const user = await User.create(req.body);
        const token = user.createJWT();

        res.status(StatusCodes.CREATED).json({
            user: { name: user.name, email: user.email },
            token
        });
    } catch (err){
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err.message})
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide email and password' });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid credentials' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid credentials' });
        }
        const token = user.createJWT();

        res.status(StatusCodes.CREATED).json({
            user: {name: user.name, email: user.email},
            token
        })
    } catch (err){
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: err.message})
    }
}

module.exports = {
    register,
    login
}