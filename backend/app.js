require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');
const authRouter = require('./routes/authRoute');
const quizRouter = require('./routes/quizRoute');

// uses
app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth', authRouter);
app.use('/api/quiz', quizRouter);

const port = process.env.PORT || 4000;

(async () => { // auto call function
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
})()