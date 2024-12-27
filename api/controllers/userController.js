const jwt = require("jsonwebtoken")

const User = require("../models/userModel")

//Register User
exports.register = async (req,res) => {
    try{
        const {userId,password} = req.body;
        if(!userId || !password){
            return res.status(400).json({message:"userId or password missing"})
        }
        const user = await User.findOne({userId});
        if(user){
            return res.status(400).json({message:"user with same userId already present"});
        }

        const newUser = new User({
            userId : userId,
            password : password
        })
        await newUser.save()
        return res.status(200).json({
            "message":"user created",
            "data":newUser
        });
    }catch(error){
        return res.status(500).json({message:"internal server error"})
    }
}

//Login User
exports.userLogin = async(req,res) =>{
    const {userId,password} = req.body;
    if (!userId || !password){
        return res.status(400).json({message:"UserId or password missing"});
    }
    const user = await User.findOne({userId})
    if (!user) {
        console.log("Invalid UserId");
        return res.status(400).json({ error: "Invalid username", success: false });
    }
    if (user.password !== password) {
        console.log("Invalid Credentials");
        return res.status(400).json({ message: "Invalid credentials", success: false });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
}

//add scores
exports.addScore = async (req, res) => {
    try {
         const { score = 0, game } = req.body;

        if (!game) {
            return res.status(400).json({ error: "Field empty", success: false });
        }

        const gameArray = ['sudoku', 'maze', 'templerun', 'snake'];
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }
        if (!gameArray.includes(game)) {
            console.error("Invalid game name");
            return res.status(400).json({ error: "Invalid game name", success: false });
        }

        const update = {};
        if (user[game].length >= 5) {
            return res.status(400).json({ 
                error: `Maximum attempts reached for ${game}. You can only submit 5 scores.`,
                success: false 
            });
        }
        update[game] = [...(user[game] || []), score];
        
        await User.findByIdAndUpdate(user._id, { $set: update });

        console.log(`Score added for ${game}: ${score}`);
        return res.status(200).json({ message: `Score added to ${game}`, score, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error", success: false });
    }
}
