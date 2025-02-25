const mongoose = require("mongoose");

const connectToDb = async(url) =>{
    try{
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log("Error in MogoDB connection",error.message);
    }

}
module.exports = connectToDb;