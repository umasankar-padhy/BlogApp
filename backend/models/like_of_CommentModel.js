


const mongoose = require("mongoose");

const likeOfCommentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true 
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }, 
    like: { type: Boolean, required: true }, 
    dislike: { type: Boolean, required: true }
    
});

module.exports = mongoose.model("likeOfComment", likeOfCommentSchema);
