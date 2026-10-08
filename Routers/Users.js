const express = require ('express');
const router = express.Router();
const controller = require('../Controllers/userFunc');
const { verifyToken,permit} = require("../Middlewares/sample")


router.get("/get-User",verifyToken,permit('Super Admin'),controller.getUser);
router.post("/post-User",verifyToken,permit('Super Admin'),controller.postUser);
router.put("/put-User",verifyToken,permit('Super Admin'),controller.putUser);
router.delete("/delete-User",verifyToken,permit('Super Admin'),controller.deleteUser);
module.exports =router;





