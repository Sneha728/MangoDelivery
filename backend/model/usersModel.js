const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
        fullName:{
            type:String,
            required:true

        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            unique:true,
        },
        cartData: {
            type: Object,  // Ensure cartData is stored as an object
            default: {}     // Default to an empty object
        }
    
},{timestamps:true});

const User = mongoose.model("User",userSchema);

module.exports = User;