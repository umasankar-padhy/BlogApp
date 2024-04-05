const express = require("express");
const router = express.Router();

const { createComment, updateComment, getComment, deleteComment, getCommentCount } = require("../controllers/commentController");
const { createPost, getAllPosts, updatePost, PhotoController, deletePost, getPostsByUser, getPostById, CountPost, CountPostByUser, getRendomPosts } = require("../controllers/postController");
const { likePost, likeCounter, dislikeCounter, likePostViewer } = require("../controllers/likeController");
const { requireSignIn } = require("../middlewares/auth");
const { createCommentOfComment, updateCommentOfComment, getCommentOfComment, getCommentOfCommentCount, deleteCommentOfComment } = require("../controllers/comment_of_CommentController");
const { likeOfComment, likeOfCommentViewer, likeOfCommentCounter, dislikeOfCommentCounter } = require("../controllers/like_of_CommentController");

router.post("/comments/create", requireSignIn, createComment);
router.put("/comments/update/:id", requireSignIn, updateComment);
router.post("/comments/get/:id", requireSignIn, getComment);
router.get("/comments/count/:id", requireSignIn, getCommentCount);
router.delete("/comments/delete/:id", requireSignIn, deleteComment);


router.post("/posts/create", requireSignIn, createPost);
router.post("/posts/count", requireSignIn, CountPost);
router.put("/posts/update/:id", requireSignIn, updatePost);
router.get("/posts/photo/:id", PhotoController);
router.post("/posts/allPosts", requireSignIn, getAllPosts);
router.delete("/posts/delete/:id", requireSignIn, deletePost);
router.post("/posts/getPostsByUser", requireSignIn, getPostsByUser);
router.post("/posts/postsByUserCount", requireSignIn, CountPostByUser);
router.get("/posts/getPostById/:id", requireSignIn, getPostById);
router.get("/posts/getRendomPosts/:id", requireSignIn, getRendomPosts);


router.post("/likes", requireSignIn, likePost);
router.post("/likesViewer", requireSignIn, likePostViewer);
router.post("/likes/likeCounter", requireSignIn, likeCounter);
router.post("/likes/dislikeCounter", requireSignIn, dislikeCounter);





router.post("/commentOfComments/create", requireSignIn, createCommentOfComment);
router.put("/commentOfComments/update/:id", requireSignIn, updateCommentOfComment);
router.post("/commentOfComments/get/:id", requireSignIn, getCommentOfComment);
router.get("/commentOfComments/count/:id", requireSignIn, getCommentOfCommentCount);
router.delete("/commentOfComments/delete/:id", requireSignIn, deleteCommentOfComment);


router.post("/likeOfComments", requireSignIn, likeOfComment);
router.post("/likeOfCommentsViewer", requireSignIn, likeOfCommentViewer);
router.post("/likeOfComments/likeCounter", requireSignIn, likeOfCommentCounter);
router.post("/likeOfComments/dislikeCounter", requireSignIn, dislikeOfCommentCounter);


module.exports= router; 

 




