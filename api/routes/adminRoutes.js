const express = require("express");
const router = express.Router()

const {validateToken,validateIsAdmin,isAdmin} = require("../middleware/jwt_auth")
const {getAllUsers, leaderboard} = require("../controllers/adminController")

router.get("/getAllUsers",validateToken,validateIsAdmin,isAdmin,getAllUsers);
router.get("/leaderboard",validateToken,validateIsAdmin,isAdmin,leaderboard)

module.exports = router;