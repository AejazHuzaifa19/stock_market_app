const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config()
const multer = require('multer')
const session = require('express-session');
const bodyParser = require('body-parser');



const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

const app = express()
connectDB();

app.use(express.json())

app.use(express.urlencoded({extended:false}))


app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api/process', require('./routes/bankRoutes'));

app.use(errorHandler)

app.listen(port,() => console.log(`server started on port ${port}`));