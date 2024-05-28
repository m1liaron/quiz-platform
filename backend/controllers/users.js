const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

const getUserData = async (req, res) => {
    try {
        const _id= req.user.userId;

        // Await the result of the Mongoose query
        const findUser = await User.findById(_id)
            .select('-password') // Exclude the password field
            .populate('own_quizzes', 'name _id'); // Populate with name and _id fields
        if (!findUser) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User does not exist' });
        }

        res.status(StatusCodes.OK).json({ user: findUser });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err.message });
    }
}

module.exports = {
    getUserData
}