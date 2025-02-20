import commentService from "../service/commentService.js";
import {comment_zod_schema} from "../validation/commentValidation.js"

// get specific user's all comments
const getUserAllComments = async (req, res) => {
    try{
        const comments = await commentService.getUserAllComments(req.body);
        if(comments.length > 0){
            res.status(200).send(comments);
        }
        else{
            res.status(404).send("No Comments found");
        }
    }
    catch(err){
        res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
}

// get specific blog's comments
const getBlogComments = async (req, res) => {
    try{
        const comments = await commentService.getBlogComments(req.body);
        if(comments.length > 0){
            res.status(200).send(comments);
        }  
        else{
            res.status(404).send("No comments found");
        }
    }
    catch(err){
        res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
}

// create comment for specific blog by specific user
const createComment = async (req, res) => {
    try{
        const validation = comment_zod_schema.safeParse(req.body);
        if(!validation.success){
            return res.status(400).json({ error: validation.error.format() });
        }
        await commentService.createComment(req.body); 
        res.status(204).send();
    }
    catch(err){
        res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
}

// update comment
const updateComment = async (req, res) => {
    try{
        req.body["id"] = req.params.id;
        const rowsAffected = await commentService.updateComment(req.body);
        if(rowsAffected.rowCount > 0){
            res.status(204).send();
        }
        else{
            res.status(404).send("Comment not found");
        }
    }
    catch(err){
        res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
}

// delete comment
const deleteComment = async (req, res) => {
    try{
        const rowsAffected = await commentService.deleteComment(req.body);
        if(rowsAffected.rowCount > 0){
            res.status(204).send();
        }
        else{
            res.status(404).send("Comment not found");
        }
    }
    catch(err){
        res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
}

export default {getUserAllComments, getBlogComments, createComment, updateComment, deleteComment};