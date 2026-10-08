const mongoose = require('mongoose');

const connectDB =  () =>{
    mongoose.connect(process.env.Url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((Dconnection)=>{
        console.log(Dconnection.connection.host);
        console.log("MongoDB connected");
    })
    .catch((err)=>
        {
            console.log(err);
        })
}

module.exports=connectDB;