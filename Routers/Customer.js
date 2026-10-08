const express = require('express');
const router = express.Router();
const controller = require('../Controllers/customerFunc');
const {verifyToken} = require('../Middlewares/sample')

router.get("/get-Customer",verifyToken,controller.getCustomer);
router.post("/post-Customer",verifyToken,controller.postCustomer);
router.put("/put-Customer",verifyToken,controller.putCustomer);
router.delete("/delete-Customer",verifyToken,controller.deleteCustomer);
module.exports =router;

