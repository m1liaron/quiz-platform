require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/connect');
// routes import
const authRouter = require('./routes/authRoute');
const quizRouter = require('./routes/quizRoute');
const questionRouter = require('./routes/questionRoute');
const userRouter = require('./routes/userRoute');
const resultRouter = require('./routes/resultRoute');

// uses
app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend origin
    credentials: true // Allow credentials (cookies)
}));
app.use(cookieParser());
app.use(express.json());

// routes
app.use('/api/auth', authRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/question', questionRouter);
app.use('/api/user', userRouter);
app.use('/api/result', resultRouter);

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