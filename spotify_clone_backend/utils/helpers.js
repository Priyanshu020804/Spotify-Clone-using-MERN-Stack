const jwt =require("jsonwebtoken");
require("dotenv").config();
exports = {};

exports.getToken = ( email , user) => {
    // Assume this token is complete
    const token = jwt.sign({identifier : user._id} , process.env.secretOrKey);
    return token;
}

module.exports =exports;