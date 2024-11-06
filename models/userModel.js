const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Sudoko:[{
        type:Number
    }],
    Snake:[{
        type:Number
    }],
    Maze:[{
        type:Number
    }],
    TempleRun:[{
        type:Number
    }]
})

module.exports = mongoose.model('userSchema',userSchema)