
// const commentId = require("../models/commentIdModel");
const Like = require("../models/like_of_CommentModel");

exports.likeOfComment = async (req, res) => {
    // exports.likecommentId = async (req, res, next) => {
    try {
        const { commentId, like,dislike } = req.body;
        user = req.user
        const existing = await Like.findOne({ commentId:commentId,user:user });
        if (existing) {
            const updateLike = await Like.findOneAndUpdate({ commentId: commentId, user: user },{like,dislike});

        } else {
            const likes = new Like({ commentId, user, like, dislike });
            const saveLike = await likes.save();
        }
        const deleteLike = await Like.deleteMany({ like:false,dislike:false });

        res.status(200).json({
            success: true,
            // data: saveLike,
        });
        // next()
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while liking commentId",
            message: err.message
        });
    }

};



exports.likeOfCommentViewer = async (req, res) => {
    // exports.likecommentId = async (req, res, next) => {
    try {
        const { commentId} = req.body;
        user = req.user
        const existing = await Like.findOne({ commentId: commentId, user: user });
        
        res.status(200).json({
            success: true,
            data: existing
            // data: saveLike,
        });
        // next()
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while liking commentId",
            message: err.message
        });
    }

};



exports.likeOfCommentCounter= async (req,res)=>{

    try{
        const {commentId}=req.body
        const count = await Like.find({ commentId: commentId ,like:true}).countDocuments();
        res.status(200).json(count);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Erorr while getting like count",
            error,
        });

    }
}

exports.dislikeOfCommentCounter = async (req, res) => {

    try {
        const { commentId } = req.body
        const count = await Like.find({ commentId: commentId, dislike: true }).countDocuments();
        res.status(200).json(count);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Erorr while getting dislike count",
            error,
        });

    }
}