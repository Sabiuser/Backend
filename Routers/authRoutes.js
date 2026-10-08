const express = require ('express');
const router = express.Router();
const {register,login,newgetToken, logout}= require('../Controllers/authController')


router.post("/register",register)
router.post("/login",login)
router.post("/refreshToken",newgetToken);
router.post("/logout",logout)

module.exports=router
