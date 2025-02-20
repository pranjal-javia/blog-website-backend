import express from 'express';
import blogController from '../controller/blogController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get("/", authMiddleware, blogController.getAllBlogs);

// to get all blog count
// router.get("/blogTotalCount", blogController.getAllBlogCounts);  // not required

// to get blog by its blog Id
router.get("/:id", blogController.getBlog);

// to get user specific blogs
// router.get("/:id", blogController.getUserBlogs); ????

// create blog
router.post("/", blogController.createBlog);

// to delete specific blog
router.post("/:id/delete", blogController.deleteBlog);

// to update specific blog
router.patch("/:id", blogController.updateBlog);

export default router;