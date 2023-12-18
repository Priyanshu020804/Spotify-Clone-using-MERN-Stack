const express = require("express");
const passport = require("passport");
const Song = require("../models/Song");
const User = require("../models/User");

const router = express.Router();

router.post("/create" , passport.authenticate("jwt" ,{session:false}) , async (req,res) =>{
    // req.user gets the user via passport.authenticate
    const { name ,thumbnail , track} = req.body;
    if( !name || !thumbnail || !track){
        return res.status(301).json({error:"Insufficient Details to create song"});
    }
    const artist = req.user._id;
    const songDetail = {name , thumbnail , track , artist};
    const createdSong = await Song.create(songDetail);
    return res.status(200).json(createdSong);
})

// Get route to get all songs i have published
router.get("/get/mySongs" , passport.authenticate("jwt" ,{session:false}) , async (req,res)=>{
    const currentUser = req.user;
    // we need to get all songs where artist_id == currentUser._id
    const songs = await Song.find({artist : currentUser._id}).populate("artist");
    return res.status(200).json({data: songs});
})

// Get routes to all songs any artist has published
// We will get artist id as input and need to return all the songs published by that artist
router.get("/get/artist/:artistID" , passport.authenticate("jwt" ,{session:false}) , async (req,res)=>{
    const ArtistId = req.params.artistID;
    // we can check if ArtistId is empty or not
    const artist =await User.findOne({_id:ArtistId});
    // ![]--> false
    // !NULL --> true
    // !undefined --> true
    if(!artist){
        return res.status(301).json({err : "Artist does not exist"});
    }
    const songs = await Song.find({artist : ArtistId});
    return res.status(200).json({data: songs});
})

// Get Route to get a single song by name
router.get("/get/songname/:songName" , passport.authenticate("jwt" ,{session:false}) , async (req,res)=>{
    const {songName} = req.params;
    // name:songName --> exact name matching , Vanilla , Vanila , vanilla
    // Pattern Matching instead of direct name matching
    const regexPattern = new RegExp(songName, 'i');
    const songs = await Song.find({ name: regexPattern }).populate("artist");
    return res.status(200).json({data: songs});
})


module.exports = router;