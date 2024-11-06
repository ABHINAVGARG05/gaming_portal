const express = require('express');
const mongoose = require('mongoose')
const User = require('../models/userModel'); 
const router = express.Router()

router.post('/',async (req,res)=>{
    try{
        const {userId,password,score,game} = req.body;
        if(!userId || !password || !score || !game){
            console.log("All field not present")
            res.status(400).json({error:"field empty",success:false})
        }
        const user = await User.findOne({userId});
        if(!user){
            console.log("Invalid UserId");
            res.status(400).json({error:"Invalid username",success:false});
        }
        if(user.password !== password){
            console.log("Invalid Credentials")
            res.status(400).json({message:"Invalid credentials",success:false})
        }
        const gameArray = ['sudoko','maze','templerun','snake']
        if (!gameArray.includes(game)) {
            console.error("invalid game name")
            res.status(400).json({error:"Invalid game name",success:false})
        }
        const update = {};
        update[game] = [...(user[game] || []), score];
        await User.findByIdAndUpdate(user._id, { $set: update });
        console.log(`Score added for ${game}: ${score}`);
        res.status(200).json({ message: `Score added to ${game}`, score ,success:true});
    }catch(error){
        console.error(error)
        res.status(500).json({error:"Server Error",success:false})
    }
})

module.exports = router;