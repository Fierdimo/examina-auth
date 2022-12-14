const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()

const usersRouter = require('./routes/userRoutes');
const manageResponse = require('./routes/manageResponses')
const rolRouter = require('./routes/rolRouter')
const authRouter = require('./routes/authenticationRouter')

const app = express();
app.use(cors())

// mongoose.connect('mongodb://localhost:27017/test')
mongoose.connect(process.env.MONGODB_PROYECT, {dbName: "data"})
    .then(console.log(`Data base connected ${mongoose.connection.readyState}`))
    .catch(error => console.log(error))
mongoose.Promise = global.Promise

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//microservice routes
app.use('/user', usersRouter);
app.use('/rol', rolRouter);
app.use('/auth', authRouter)
app.use(manageResponse)

module.exports = app;
