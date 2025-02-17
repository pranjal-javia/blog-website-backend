import express from 'express';
import commentController from '../controller/commentController.js';

const router = express.Router();

router.post("/", commentController.getUserAllComments);

export default router;