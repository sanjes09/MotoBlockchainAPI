//IMPORTS
require("dotenv").config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require("cors");

//CONFIG
const app = express();
const limit = rateLimit({
    max: 1000,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout 
    message: 'Too many requests, you are locked for 1hr' // message to send
});

//MIDDELWARES
app.use(express.urlencoded({extended: true ,limit: '5mb'}))
app.use(express.json({ limit: '5mb' }));
app.use(xss());
app.use(helmet());
app.use('*', limit);
app.options("*", cors());
app.use(cors());

//ROUTERS
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);
// ROUTERS

app.get('*', (req, res) => {
    res.status(400).json({
        ok:false,
        error: 'Unknown command'
    });
    return;
});

//CONNECTION
app.listen(process.env.PORT,() => {
    console.log(`Server running on port ${process.env.PORT}`);
});