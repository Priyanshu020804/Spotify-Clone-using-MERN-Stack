// How to create a model

// Step 1: Require Mongoose
const mongoose = require("mongoose");

// Step 2: Create a Mongoose schema (structure of a user)

const User = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
        private : true,
    },
    lastName : {
        type : String,
        required : false,

    },
    email : {
        type : String,
        required : true,
    },
    userName : {
        type : String,
        required : true,
    },
    likedSongs : {
        // We will change this to array later
        type : String,
        default : "",
    },
    likedPlaylists : {
        // We will change this to array later
        type : String,
        default : "",
    },
    subscribedArtist : {
        // We will change this to array later
        type : String,
        default : "",
    },
})

// Step 3 : Create a model

const UserModel = mongoose.model("User" , User);

module.exports =UserModel;