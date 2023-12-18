// How to create a model

// Step 1: Require Mongoose
const mongoose = require("mongoose");

// Step 2: Create a Mongoose schema (structure of a user)

const Song = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    thumbnail : {
        type : String,
        required : true,
    },
    track : {
        type : String,
        required : true,
    },
    artist : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
})

// Step 3 : Create a model

const SongModel = mongoose.model("Song" , Song);

module.exports =SongModel;