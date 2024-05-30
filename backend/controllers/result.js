const Result = require('../models/Result');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const createResult = async (req, res) => {
    try {
        const userId = req.user.userId;
        const quizData = req.body;

        const result = await Result.create(quizData);
        const findUser = await User.findById(userId);

        if(!findUser){
            return res.status(StatusCodes.NOT_FOUND).json({ message: `Not found user with id: ${userId}` });
        }

        findUser.completed_quizzes.push({
            resultId: result._id,
            title: result.title,
        });
        // Save the updated user document
        await findUser.save();

        res.status(201).json(result);
    } catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message})
    }
}

const getResult = async (req, res) => {
    try {
        const {id} = req.params;

        const result = await Result.findOne({_id: id});
        if(!result){
            return res.status(200).json({message: `No results found with id: ${id}`});
        }

        res.status(200).json(result);
    } catch (error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error.message})
    }
}

module.exports = {
    createResult,
    getResult
}