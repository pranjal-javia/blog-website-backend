import express from 'express';
import commentController from '../controller/commentController.js';

const router = express.Router();

// get all comments for specific user
router.post("/", commentController.getUserAllComments);

// get all comments for specific blog
router.post("/blog-comments", commentController.getBlogComments);

// create comment
router.post("/create", commentController.createComment);

// update comment
router.patch("/update", commentController.updateComment);

// delete comment
router.delete("/delete", commentController.deleteComment);

export default router;