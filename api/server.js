const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan')
const cors = require('cors');
const authRouter = require('./router/authRouter');
// const dbConfig = require('./database/dbConfig.js')
const server = express();



server.use(helmet());
server.use(morgan('dev'))
server.use(express.json());
server.use(cors());



server.use('/api/auth', authRouter);




module.exports = server;