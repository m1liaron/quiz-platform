const { StatusCodes } = require('http-status-codes');
const Question = require('../models/Question');

const updateQuestion = async (req, res) => {
    try {
        const {id} = req.params;

        const updatedQuestion = await Question.findByIdAndUpdate({
            _id: id,
        }, req.body)
        if(!updatedQuestion){
            return res.status(400).json({error: `Question with id: ${id},  not found`});
        }

        res.status(StatusCodes.OK).json(updatedQuestion);
    } catch(err){
        console.log(err);
        res.status(400).json({error: err.message})
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const {id} = req.params;

        const findQuestion = Question.findOne({id});
        if(!findQuestion){
            return res.status(400).json({error: `Question with id: ${id}, not found`});
        }
        await Question.findByIdAndDelete(id)

        res.status(StatusCodes.OK).json({message: `Question with id: ${id}, successfully deleted`});
    } catch(err){
        console.log(err);
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    updateQuestion,
    deleteQuestion
}