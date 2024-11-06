const express = require('express')
// const mongoose = require('mongoose')
const cors = require('cors');

const connectDb = require('./db/dbConnection')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3030
connectDb();

app.use(cors());
app.use(express.json());

const infoRoute = require('./routes/getAllScores')
const addScore = require('./routes/addScore')

app.use('/',infoRoute)
app.use('/score',addScore)

app.listen(PORT,()=>{
    console.log("Welcome")
    console.log(`App listneing on Port ${PORT}`)
})
