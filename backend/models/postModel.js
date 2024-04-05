


const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user: { 
        type: String, 
        required: true, 
        trim: true 
    },
    title: {
        type: String,
        required: true,
        trim: true 
    },
    description: {
        type: String,
        required: true,
        trim: true 
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    // comments: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "comment"
    // },
    // likes: {
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"like"
    // },
    // dislikes: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "dislike"
    // },
    date: { type: Date,
        default: Date.now 
    }
    
});

module.exports = mongoose.model("post", postSchema);
