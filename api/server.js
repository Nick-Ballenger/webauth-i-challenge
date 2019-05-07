const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const authRouter = require('../auth/auth-router.js');
const KnexSessionStore = require('connect-session-knex')(session);
const dbConfig = require('../data/dbconfig')

const server = express();

const sessionConfig = {
  name: 'Ze super cookies',
  secret: process.env.SECRET || 'The Secret Sauce',
  cookie:{
    maxAge: 1000 * 60 * 60, 
    secure: false, 
    httpOnly: true, 
  },
  resave: false, 
  saveUninitialized: false, 
  store: new KnexSessionStore({
    knex: dbConfig,
    tablename: 'sessions', 
    sidfieldname: 'sid', 
    createtable: true, 
    clearInterval: 1000 * 60 * 10
  })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))


server.use('/api/auth', authRouter);


module.exports = server;