const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const profileRoute = require('./routes/profile');
const messageRoute = require('./routes/messages');
const groupRoute = require('./routes/groups')
const app = express();
dotenv.config();


app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/profile', profileRoute);
app.use('/api/message', messageRoute);
app.use('/api/groups', groupRoute);


mongoose.connect(process.env.MONGO_URL)
    .then(() => {

        app.listen(process.env.PORT, () => {
            console.log('The server is running and connected to db')
        })
    })
    .catch((err) => console.log(err))