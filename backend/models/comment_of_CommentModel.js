
const mongoose = require("mongoose");

const commentOfCommentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true, 
        trim: true 
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    },
    comment: {
        type: String,
        required: true,
        trim: true 
    }
});

module.exports = mongoose.model("commentOfComment", commentOfCommentSchema);
