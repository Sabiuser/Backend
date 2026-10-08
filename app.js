// const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const nodemon = require("nodemon");
const cookieParser = require('cookie-parser');



const dataInfo =(req,res,next)=>{
    console.log(`${req.method} ${req.path}`);
    next();

}


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(dataInfo);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
 const users = require('./Routers/Users');
 const auth = require ('./Routers/authRoutes');
 const customer = require ('./Routers/Customer');
 const product = require ('./Routers/Product');
 app.use("/Users",users);
 app.use("/Customer",customer);
 app.use("/Product",product);
 app.use("/auth",auth);
 

 module.exports = app;