// How to create a model

// Step 1: Require Mongoose
const mongoose = require("mongoose");

// Step 2: Create a Mongoose schema (structure of a user)

const Playlist = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    thumbnail : {
        type : String,
        required : true,
    },
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    songs: [
        {
            type : mongoose.Types.ObjectId,
            ref : "Song",
        }
    ],
    collaborators : [
        {
            type : mongoose.Types.ObjectId,
            ref : "User"
        }
    ],
    
})

// Step 3 : Create a model

const PlaylistModel = mongoose.model("Playlist" , Playlist);

module.exports = PlaylistModel;