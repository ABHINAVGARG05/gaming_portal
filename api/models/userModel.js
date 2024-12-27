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
    sudoku:[{
        type:Number
    }],
    snake:[{
        type:Number
    }],
    maze:[{
        type:Number
    }],
    templerun:[{
        type:Number
    }],
    role:{
        type:String,
        default:'user',
        enum:['user','admin']
    }
})

module.exports = mongoose.model('userSchema',userSchema)