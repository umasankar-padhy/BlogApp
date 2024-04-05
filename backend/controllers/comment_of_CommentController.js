
const Comment = require("../models/comment_of_CommentModel");

exports.createCommentOfComment = async (req, res) => {
    try {
        const { commentId, comment } = req.body;
        user = req.user
        const comments = new Comment({ commentId, user, comment });
        const savecomment = await comments.save();

        res.status(200).json({
            success: true,
            data: savecomment,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while creating comment",
            message: err.message
        });
    }
};





exports.updateCommentOfComment = async (req, res) => {
    try {
        const { comment } = req.body;
        user = req.user

        const savecomment = await Comment.findOneAndUpdate({ _id: req.params.id, user: user }, { comment }, { new: true });
        if (savecomment) {
            res.status(200).json({
                success: true,
                data: savecomment,
            });
        } else {
            res.status(200).json({
                success: false,
                data: savecomment,
                message: "unauthorised access"
            });
        }


    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while updating comment",
            message: err.message
        });
    }
};





exports.getCommentOfComment = async (req, res) => {
    try {
        const { index, type, order } = req.body
        // console.log(index)
        const getcomment = await Comment.find({ commentId: req.params.id }).sort({ [type]: order }).limit(index);

        res.status(200).json({
            success: true,
            data: getcomment,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while getting comment",
            message: err.message
        });
    }
};


exports.getCommentOfCommentCount = async (req, res) => {
    try {
        // console.log(req.params.id)
        const count = await Comment.find({ commentId: req.params.id }).countDocuments();

        res.status(200).json(count);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while getting comment",
            message: err.message
        });
    }
};





exports.deleteCommentOfComment = async (req, res) => {
    try {
        user = req.user

        const deletecomment = await Comment.findOneAndDelete({ _id: req.params.id, user: user }, { new: true });
        if (deletecomment) {
            res.status(200).json({
                success: true,
                data: deletecomment,
            });
        } else {
            res.status(200).json({
                success: false,
                data: deletecomment,
                message: "unauthorised access"
            });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while deleting comment",
            message: err.message
        });
    }
};











