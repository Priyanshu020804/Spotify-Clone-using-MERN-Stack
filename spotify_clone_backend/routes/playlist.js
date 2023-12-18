const express = require("express");
const passport = require("passport");
const Song = require("../models/Song");
const Playlist = require("../models/Playlist");
const User = require("../models/User");

const router = express.Router();

// Create a Playlist
router.post("/create" , passport.authenticate("jwt" ,{session:false}) , async(req,res) =>{
    const currentUser =req.user;
    const {name, thumbnail,songs} = req.body;
    if(!name || !thumbnail ||!songs){
        return res.status(301).json({err:"Insufficient Details"});
    }
    const playlistData = {name,thumbnail,songs,owner:currentUser._id,collaborators:[]};
    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
})

// Get a Playlist by id
// we will get Playlist Id as a parameter and need to return the playlist having that id
// playlist/get/:playlistId --> in this : represent that playlistId is a variable to which we can assign any value
// playlist/get/BestSongs --> this api will be called
router.get("/get/playlist/:playlistId" , passport.authenticate("jwt" ,{session:false}) , async(req,res) =>{
    // This concept is called req.params
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({_id:playlistId}).populate({
        path:"songs",
        populate : {
            path : "artist"
        }
    });
    if(!playlist){
        return res.status(301).json({err : "Invalid Playlist Id"});
    }
    return res.status(200).json(playlist);
})

// Get all Playlist made bme
router.get("/get/me" ,passport.authenticate("jwt" ,{session:false}) , async(req,res) =>{
    const artistId =req.user._id;
    const playlist =await Playlist.find({owner:artistId}).populate('owner');
    return res.status(200).json({data : playlist});
})

// Get all Playlist made by an artist
router.get("/get/artist/:artistId" ,passport.authenticate("jwt" ,{session:false}) , async(req,res) =>{
    const artistId =req.params.artistId;
    const artist = await User.findOne({_id:artistId});
    if(!artist){
        return res.status(304).json({err : "Invalid Artist Id"});
    }
    const playlist =await Playlist.find({owner:artistId});
    return res.status(200).json({data : playlist});
})

// Add a song to a playlist
router.post("/add/song" , passport.authenticate("jwt" ,{session:false}) , async(req,res) =>{
    const currentUser = req.user;
    const {playlistId ,songId} = req.body;
    
    const playlist = await Playlist.findById(playlistId);
    if(!playlist){
        return res.status(305).json({err : "Playlist does not exist"});
    }
    // Check if cuurentUser owns the playlist or is a collaborator
    if( !playlist.owner.equals(currentUser._id) && !playlist.collaborators.includes(currentUser._id)){
        return res.status(400).json({err : "Not Allowed"});
    }
    // Check if song is a valid song
    const song = await Song.findById(songId);
    if(!song){
        return res.status(305).json({err : "Song does not exist"});
    }
    // Add song to the Playlist
    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).json(playlist);
})

module.exports = router;