const express = require("express")
const router = express.Router()


const {register,userLogin,addScore} = require('../controllers/userController')
const {validateToken} = require("../middleware/jwt_auth")


router.post('/register',register);
router.post('/login', userLogin);
router.post('/score',validateToken,addScore)
router.post

module.exports = router;