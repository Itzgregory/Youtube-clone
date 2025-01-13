
/*-------Express -------- */
const express = require('express');
const cookieParser = require('cookie-parser');
const {MONGO_URL} = require('../../config')
const app = express(),
    json = express.json(),
    passport = require('passport'),
    session = require('express-session'),
    MongoStore = require('connect-mongo'),
    advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(json)
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        mongoOptions: advancedOptions
    }),
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: process.env.NODE_ENV === "production" && 'none',
        secure: process.env.NODE_ENV === "production" ? true : false
    },
    name: "nameSession",
    secret: 'session',
    resave: true,
    saveUninitialized: true,
}));

import gmailPassport  = require('../middleware')

gmailPassport
app.use(passport.initialize()),
app.use(passport.session())

app.use('/thumbnails', express.static('storage/thumbnails'))
app.use('/previews', express.static('storage/previews'))

/* ----------- Routes ------------------ */
import { Routes } from '../routes';
app.use(Routes)




export { app }