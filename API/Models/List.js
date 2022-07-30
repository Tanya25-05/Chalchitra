const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
    {
        title: {type:String,unique:true,required:true},
        type: { type:String},
        genre: String,
        content:{type:Array},    // Movie list ki _id in "content" 
    },
    {
        timestamps:true
    }
);

// First argument is singular name of the collection
// Mongoose will create the database collection for Model "LIST"  
module.exports = mongoose.model("List",listSchema);