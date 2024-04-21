require('dotenv').config();
const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))
// init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// init db
require('./database/init.mongodb')
// init routers
app.use('', require('./routers/index'))
// handle error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404
    next(error)
});
app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: statusCode,
        metadata: '',
        message: error.message || 'Internal server error!!!!',
        stack: error.stack
    })
})
module.exports = app;