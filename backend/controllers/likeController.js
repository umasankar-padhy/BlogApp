
// const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
    // exports.likePost = async (req, res, next) => {
    try {
        const { post, like,dislike } = req.body;
        user = req.user
        const existing = await Like.findOne({ post:post,user:user });
        if (existing) {
            const updateLike = await Like.findOneAndUpdate({ post: post, user: user },{like,dislike});

        } else {
            const likes = new Like({ post, user, like, dislike });
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
            data: "error while liking post",
            message: err.message
        });
    }

};



exports.likePostViewer = async (req, res) => {
    // exports.likePost = async (req, res, next) => {
    try {
        const { post} = req.body;
        user = req.user
        const existing = await Like.findOne({ post: post, user: user });
        
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
            data: "error while liking post",
            message: err.message
        });
    }

};



exports.likeCounter= async (req,res)=>{

    try{
        const {post}=req.body
        const count = await Like.find({ post: post ,like:true}).countDocuments();
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

exports.dislikeCounter = async (req, res) => {

    try {
        const { post } = req.body
        const count = await Like.find({ post: post, dislike: true }).countDocuments();
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




// exports.deleteLikePost = async (req, res) => {
//     try {
//         const { post, user ,like,dislike} = req.body;
//         // const unlike = new unLike({ post, user });
//         const deleteLike = await Like.findOneAndDelete({post:post,user:user});
//         // const updatePost = await Post.findByIdAndUpdate(post, { $pull: { likes: deleteLike._id } }, { new: true }).populate("likes").exec();;
            
//         res.status(200).json({
//             success: true,
//             data: deleteLike,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             success: false,
//             data: "error while delete liking post",
//             message: err.message
//         });
//     }
// };







