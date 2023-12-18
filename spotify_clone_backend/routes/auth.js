const express = require("express");
const User = require("../models/User");
const bcrypt= require("bcrypt");
const {getToken} =require("../utils/helpers");

const router = express.Router();  // .Router is used intead of only express() to not include unnecessary functons

// This POST will help to register a nerw user
router.post("/register" , async (req,res) =>{
    // This code is run when /register api is called as a POST request

    // My req.body will be of the format (firstName , lastName , email , userName ,password)
    const {email , password , firstName ,lastName ,userName} = req.body;

    // Check whether a user already exists (if yes --> error)
    const user = await User.findOne({email:email});
    if( user ){
        // status code by default is 200
        return res
            .status(403)
            .json({error: "A User with this email already exists"});
    }

    // This is a valid request

    // Create a new user in the DataBase
    // We dont store password in plain text
    // xyz --> we convert a plain text password to a hash
    const hashedPassword = await bcrypt.hash(password,10);
    const newUserData = { email ,password: hashedPassword  ,firstName ,lastName ,userName};
    const newUser = await User.create(newUserData);

    // We want to create a token to return to the user
    const token = getToken(email , newUser);

    // Return result to user
    const UserToReturn = { ...newUser.toJSON() , token };
    delete UserToReturn.password;
    return res.status(200).json(UserToReturn);
})

router.post("/login" , async (req,res) =>{
    // This code is run when /login api is called as a POST request

    // My req.body will be of the format (email ,password)
    const {email , password} = req.body;
    // Check whether a user exists or not (if not --> error)
    const user = await User.findOne({email:email});
    if( !user ){
        // status code by default is 200
        return res.status(403).json({err: "Invalid Credentials"});
    }
    // If user exists , check if password is valid or not (if not --> credentials invalid)
    // bcrypt.compare() enables us to compare 1 password in plain text to a hashed password
    // This will be true or false
    const isPassswordValid = await bcrypt.compare(password , user.password);

    if( !isPassswordValid ){
        // status code by default is 200
        return res.status(403).json({err: "Invalid Credentials"});
    }
    // Return a token to user
    const token = getToken(user.email , user);
    // Return result to user
    const UserToReturn = { ...user.toJSON() , token };
    delete UserToReturn.password;
    return res.status(200).json(UserToReturn);

})

module.exports = router;