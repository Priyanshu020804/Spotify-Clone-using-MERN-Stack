// npm init : package.json --> This is a node project
// npm i express : Installed Express.Js package

const express =require("express");
const mongoose =require("mongoose");
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
require("dotenv").config();
const cors = require("cors");

const app =express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get('/api/secret', (req, res) => {
    const cloudinaryCloudname = process.env.cloudinary_cloudName;
    const cloudinaryUploadPreset = process.env.cloudinary_upload_preset;
    // Make sure the values are truthy before sending
    if (cloudinaryCloudname && cloudinaryUploadPreset) {
      // Convert to JSON and send
      res.json({
        secretKey1: cloudinaryCloudname,
        secretKey2: cloudinaryUploadPreset
      });
    } else {
      // Handle the case where one or both values are not available
      res.status(500).json({ error: 'One or both Cloudinary upload presets not available' });
    }
  });
  

// Connect mongodb to our node app
// mongoose.connect takes two arguments  
// 1: Which Database to connect to   --- > (URL of Mongodb)
// 2: connection options
mongoose.connect(
    // Add your MONGO_PASSWORD in a .env file using npm dotenv
    "mongodb+srv://priyanshu:" + process.env.MONGO_PASSWORD +"@cluster0.xtfxmiz.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
)
.then((x) => {
        console.log("Connected to Mongo!")
}).catch((err) => {
    console.log("Error while connecting to Mongo")
});


// Setup passport-jwt
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({ _id: jwt_payload.identifier });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    } catch (err) {
        return done(err, false);
    }
}));


//API : Get type : / : return text "hello World!"
app.get( "/" , (req,res) => {
    // req contains all data for the request
    // res contains all data for the response
    res.send("HELLO WORLD!");
})

app.use("/auth" , authRoutes);
app.use("/song" , songRoutes);
app.use("/playlist" , playlistRoutes);

// Now we will tell express that our server will run on port 8000
app.listen(port , () =>{
    console.log("APP is running on port " + port);
})
