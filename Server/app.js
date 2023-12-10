require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');

const auth = require('./modules/auth/auth.route');
const user = require("./modules/user/user.route");
const classes = require("./modules/classes/classes.route");
const classenrollment = require("./modules/classenrollment/classenrollment.route");

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use("/auth", auth);
app.use("/user", user);
app.use("/classes", classes);
app.use("/enrollment", classenrollment);

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
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