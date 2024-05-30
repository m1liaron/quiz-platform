const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

const getUserData = async (req, res) => {
    try {
        const _id= req.user.userId;

        // Await the result of the Mongoose query
        const findUser = await User.findById(_id)
            .select('-password') // Exclude the password field
            .populate('own_quizzes', 'name _id') // Populate with name and _id fields
        if (!findUser) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User does not exist' })
        }

        res.status(StatusCodes.OK).json({ user: findUser });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const _id = req.user.userId;
        const {data} = req.body

        console.log(req.body)
        const updatedUser = await User.findByIdAndUpdate(_id, data, {
            new: true,           // Return the updated document
            runValidators: true  // Ensure the updates adhere to the model's schema
        })
            .select('-password') // Exclude the password field
            .populate('own_quizzes', 'name _id'); // Populate with name and _id fields

        res.status(StatusCodes.OK).json({ user: updatedUser });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err.message });
    }
}

module.exports = {
    getUserData,
    updateUser
}