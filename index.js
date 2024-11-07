const express = require('express')
// const mongoose = require('mongoose')
const cors = require('cors');

const connectDb = require('./api/db/dbConnection')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3030
connectDb();

app.use(cors());
app.use(express.json());

const leaderBoard = require('./api/routes/leaderboard')
const addScore = require('./api/routes/addScore')

app.get("/", (req, res)=>{
  return res.send("Welcome to GAME PORTAL BE");
})
app.use('/score',addScore)
app.use('/leaderBoard',leaderBoard)

app.listen(PORT,()=>{
    console.log("Welcome")
    console.log(`App listneing on Port ${PORT}`)
    console.log(`http://localhost:${PORT}/`);
})
