const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    // First Object
    username: {type:String, required:true, unique:true},
    email: {type:String,required:true,unique:true },
    password: {type:String,required:true},  // to give ash vslue wwe have a library npm add crypto-js
    profilePic: {type:String,default:""},
    isAdmin: {type:Boolean, default:"false"},

},
{ // Second Object
        timestamps: true }
);

// First argument is singular name of the collection
// Mongoose will create the database collection for Model "USER"
module.exports = mongoose.model( "User", UserSchema);



