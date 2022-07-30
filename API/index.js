const express = require('express');
const dotenv = require('dotenv');
// instantiation of Express
const app = express();
dotenv.configure;
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/users");
const movieRoute = require("./Routes/movies");
const listRoute = require("./Routes/lists");

const mongoose = require("mongoose"); 
mongoose.connect("mongodb+srv://tanya15:tanya15@cluster0.qs3wl.mongodb.net/MovieManiaretryWrites=true&w=majority", 
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true,

}, 
// callback function is called at the completion of given task
()=>{console.log("Db connected")});

mongoose.connection
.once('open',()=> console.log("Connected"))
.on('error', (error)=>
{
   console.log("Your error",error);
});

//using body and sending it to express server in json format is not possible as it does not aceept it directly in json format accept express.json files
app.use(express.json());
app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

// used to bind and listen the connections on the specified host and port 
app.listen(8800,()=>  // Express.js
{
    console.log("backend server is running")
});  
