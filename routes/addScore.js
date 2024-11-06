const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel'); 
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { userId, password, score = 0, game } = req.body;

        // Validate fields
        if (!userId || !password || !game) {
            return res.status(400).json({ error: "Field empty", success: false });
        }

        // Find user by userId
        const user = await User.findOne({ userId });
        if (!user) {
            console.log("Invalid UserId");
            return res.status(400).json({ error: "Invalid username", success: false });
        }

        // Validate password
        if (user.password !== password) {
            console.log("Invalid Credentials");
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        // Validate game name
        const gameArray = ['sudoku', 'maze', 'templerun', 'snake'];
        if (!gameArray.includes(game)) {
            console.error("Invalid game name");
            return res.status(400).json({ error: "Invalid game name", success: false });
        }

        // Update the user's score for the specific game
        const update = {};
        update[game] = [...(user[game] || []), score];
        
        await User.findByIdAndUpdate(user._id, { $set: update });

        console.log(`Score added for ${game}: ${score}`);
        return res.status(200).json({ message: `Score added to ${game}`, score, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error", success: false });
    }
});

module.exports = router;
