import express from 'express';
import blogController from '../controller/blogController.js';

const router = express.Router();

router.get("/", blogController.getAllBlogs);

// to get blog by its blog Id
router.post("/", blogController.getBlog);

// to get user specific blog
router.post("/user-blogs", blogController.getUserBlogs);

// create blog
router.post("/create", blogController.createBlog);

// to delete specific blog
router.delete("/delete", blogController.deleteBlog);

// to update specific blog
router.patch("/update", blogController.updateBlog);

export default router;