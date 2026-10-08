const express = require('express');
const router = express.Router();
const controller = require('../Controllers/productFunc');
const {verifyToken} = require('../Middlewares/sample')

router.get("/get-Product",verifyToken,controller.getProduct);
router.post("/post-Product",verifyToken,controller.postProduct);
router.put("/put-Product",verifyToken,controller.putProduct);
router.delete("/delete-Product",verifyToken,controller.deleteProduct);
module.exports =router;