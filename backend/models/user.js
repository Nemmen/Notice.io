const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim:true
    },
    role:{
        type:String , 
        enum:["Admin","Student","Moderator"],
    },
    batch:{
        type:String,
        enum:["uniques 1.0","uniques 2.0","uniques 3.0","super 60"]
    }
 })

 module.exports = mongoose.model("User",userSchema)