const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
    {
        title:String,
        desc:String,
        imgTitle: {type:String}, // Movie title image
        img: {type:String},  // Movie Poster image
        imgThumbnail: {type:String},  // Thumbnail image:
        trailer: {type:String},
        video: {type:String},
        year: {type:String},
        limit: {type:String},
        genre: {type:String},
        isSeries: {type:Boolean,default:false},
     
    },
    { timestamps:true }
);
// First argument is singular name of the collection
// Mongoose will create the database collection for Model "MOVIE"
module.exports = mongoose.model("Movie",MovieSchema)

