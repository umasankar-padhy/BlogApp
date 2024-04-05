
const Post = require("../models/postModel");
const Comment = require("../models/commentModel")
const Like = require("../models/likeModel")

exports.createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        user = req.user
        const post = new Post({ user, title, description });

        const photo = req?.files?.img;
        // console.log(photo)
        if (photo) {
            post.photo.data = photo.data
            post.photo.contentType = photo.mimetype;
        }
        const savePost = await post.save();
        res.status(200).json({
            success: true,
            data: savePost,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while creating Post",
            message: err.message
        });
    }
};



exports.updatePost = async (req, res) => {
    try {
        const { title, description } = req.body;
        user = req.user
        const post = await Post.findOneAndUpdate({ _id: req.params.id, user: user },
            { title, description }, { new: true });
        // console.log(post)
        if (!post) {

            return res.status(200).json({
                success: false,
                data: post,
                message: "unauthorised access"
            });
        }
        const photo = req?.files?.img;
        // console.log(photo)
        if (photo) {
            post.photo.data = photo.data
            post.photo.contentType = photo.mimetype;
        }
        // const savePost = await Post.findOneAndUpdate({ _id:req.params.id, user: user }, {post });
        // console.log(post)
        await post.save();
        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while creating Post",
            message: err.message
        });
    }
};


exports.getAllPosts = async (req, res) => {
    try {
        const { index, size, keyword, type, order } = req.body
        // console.log(index, size)
        // console.log(keyword)
        // console.log(type)

        if (keyword) {
            const posts = await Post.find({
                $or: [
                    { user: { $regex: keyword, $options: "i" } },
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                    // { _id: keyword }, { date: keyword },

                    // { _id: { $regex: keyword, $options: "i" } },
                    // { date: { $regex: keyword, $options: "i" } },
                ],
            })
                .sort({ [type]: order })
                .skip(index).limit(size).select("-photo");
            res.status(200).json({
                success: true,
                data: posts,
                message: "post finded successfully",

            });
        } else {
            const posts = await Post.find({})
                .sort({ [type]: order })
                .skip(index).limit(size).select("-photo");
            res.status(200).json({
                success: true,
                data: posts,
                message: "employee finded successfully",

            });
        }




        // const posts = await Post.find().select("-photo");
        // res.status(200).json({
        //     success: true,
        //     data: posts,
        // });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while fetching Post",
            message: err.message
        });
    }
};


exports.PhotoController = async (req, res) => {
    try {
        // console.log("1")

        const postImg = await Post.findById(req.params.id).select("photo");
        // console.log("2")
        if (postImg.photo.data) {
            res.set("Content-type", postImg.photo.contentType);
            // console.log(postImg.photo.data)
            return res.status(200).send(postImg.photo.data);

        }
        else
            return res.status(200).json(0);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
};



exports.deletePost = async (req, res) => {
    try {

        user = req.user
        const deletepost = await Post.findOneAndDelete({ _id: req.params.id, user: user }, { new: true }).select("-photo");
        // console.log(deletepost)
        if (!deletepost) {

            return res.status(200).json({
                success: false,
                data: deletepost,
                message: "unauthorised access"
            });
        }

        const deletecomment = await Comment.deleteMany({ post: req.params.id });
        const deletelike = await Like.deleteMany({ post: req.params.id });
        res.status(200).json({
            success: true,
            data: deletepost,
            deletecomment: deletecomment,
            deletelike: deletelike,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while  deleteing Post",
            message: err.message
        });
    }
};



exports.getPostsByUser = async (req, res) => {


    try {
        const { index, size, keyword, type, order } = req.body
        // console.log(index, size)
        // console.log(keyword)
        // console.log(type)
        user = req.user
        if (keyword) {
            const posts = await Post.find({
                user: user,
                $or: [
                    { user: { $regex: keyword, $options: "i" } },
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                    // { _id: keyword }, { date: keyword },

                    // { _id: { $regex: keyword, $options: "i" } },
                    // { date: { $regex: keyword, $options: "i" } },
                ],
            })
                .sort({ [type]: order })
                .skip(index).limit(size).select("-photo");
            res.status(200).json({
                success: true,
                data: posts,
                message: "post finded successfully",

            });
        } else {
            const posts = await Post.find({ user: user, })
                .sort({ [type]: order })
                .skip(index).limit(size).select("-photo");
            res.status(200).json({
                success: true,
                data: posts,
                message: "employee finded successfully",

            });
        }




        // user = req.user
        // const posts = await Post.find({ user: user }).select("-photo");
        // res.status(200).json({
        //     success: true,
        //     data: posts,
        // });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while fetching Post",
            message: err.message
        });
    }
};







exports.getRendomPosts = async (req, res) => {


    try {
       
            const posts = await Post.aggregate([{$match: {user: req.params.id, }},{$project:{photo:0}},{$sample: {size:9}}])

            res.status(200).json({
                success: true,
                data: posts,
                message: "post finded successfully",

            });
        

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while fetching Post",
            message: err.message
        });
    }
};









exports.getPostById = async (req, res) => {
    try {


        const posts = await Post.findOne({ _id: req.params.id }).select("-photo");
        res.status(200).json({
            success: true,
            data: posts,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "error while fetching Post",
            message: err.message
        });
    }
};














exports.CountPost = async (req, res) => {
    try {
        const { keyword } = req.body;
        if (keyword) {
            const post = await Post.find({
                $or: [
                    { user: { $regex: keyword, $options: "i" } },
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },

                    // { _id: keyword }, { date: keyword },
                    //  { _id: { $regex: keyword, $options: "i" } },
                    //  { date: { $regex: keyword, $options: "i" } },
                ],
            }).countDocuments();
            res.status(200).json(post);
        } else {
            const post = await Post.countDocuments();
            res.status(200).json(post);
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
};












exports.CountPostByUser = async (req, res) => {
    try {
        const { keyword } = req.body;
        user = req.user

        if (keyword) {
            const post = await Post.find({
                user: user,
                $or: [
                    { user: { $regex: keyword, $options: "i" } },
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },

                    // { _id: keyword }, { date: keyword },
                    //  { _id: { $regex: keyword, $options: "i" } },
                    //  { date: { $regex: keyword, $options: "i" } },
                ],
            }).countDocuments();
            res.status(200).json(post);
        } else {
            const post = await Post.find({ user: user }).countDocuments();
            res.status(200).json(post);
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
};



