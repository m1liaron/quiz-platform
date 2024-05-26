const { StatusCodes } = require('http-status-codes');
const Quiz = require('../models/Quiz');

const createQuiz = async (req, res) => {
    try {

    } catch (err){
        console.log(err.message);
        res.status(400).send({error: err.message});
    }
}

const updateQuiz = async (req, res) => {
    try {

    } catch (err){
        console.log(err.message);
        res.status(400).send({error: err.message});
    }
}

const deleteQuiz = async (req, res) => {
    try {

    } catch (err){
        console.log(err.message);
        res.status(400).send({error: err.message});
    }
}

const getQuiz = async (req, res) => {
    try {

    } catch (err){
        console.log(err.message);
        res.status(400).send({error: err.message});
    }
}

module.exports = {
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuiz
}