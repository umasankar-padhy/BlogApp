
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true, 
        trim: true 
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
    comment: {
        type: String,
        required: true,
        trim: true 
    }
});

module.exports = mongoose.model("comment", commentSchema);
