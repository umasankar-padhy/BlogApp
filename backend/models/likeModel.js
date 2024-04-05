


const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true 
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }, 
    like: { type: Boolean, required: true }, 
    dislike: { type: Boolean, required: true }
    
});

module.exports = mongoose.model("like", likeSchema);
