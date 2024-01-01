require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const auth = require('./modules/auth/auth.route');
const user = require('./modules/user/user.route');
const classes = require('./modules/classes/classes.route');
const classEnrollment = require('./modules/classenrollment/classenrollment.route');
const examPeriod = require('./modules/examinationperiod/examperiod.route');
const exam = require('./modules/exam/exam.route');
const question = require('./modules/question/question.route');
const subject = require('./modules/subject/subject.route');
const submission = require('./modules/submission/submission.route')

const app = express();

app.use(express.json());

app.use(cors());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use('/auth', auth);
app.use('/user', user);
app.use('/classes', classes);
app.use('/enrollment', classEnrollment);
app.use('/period', examPeriod);
app.use('/exam', exam);
app.use('/question', question);
app.use('/subject', subject);
app.use('/submission', submission);

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Kết nối đến MongoDB thành công');
    })
    .catch((err) => {
        console.error('Kết nối đến MongoDB thất bại', err);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
