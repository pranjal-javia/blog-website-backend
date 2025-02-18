import express from "express";
import reactionController from "../controller/reactionController.js";

const router = express.Router();

// get all user who have liked particular blog
router.post("/get-all-likes", reactionController.getAllReactionLikes);

// get all user who have disliked particular blog
router.post("/get-all-dislikes", reactionController.getAllReactionDislikes);

// get count for both likes and dislikes for particular blog
router.post("/get-count", reactionController.getAllReactionCounts);

// to add or update rection on any particular blog by particular user
router.post("/update-reaction", reactionController.updateReaction);

export default router;