import commentRepository from "../repository/commentRepository.js";
import { v4 as uuidv4 } from "uuid";

const getUserAllComments = async (data) => {
    const comments = await commentRepository.getUserAllComments(data);
    return comments;
}

const getBlogComments = async (data) => {
    const comments = await commentRepository.getBlogComments(data);
    return comments;
}

const createComment = async (data) => {
    data["id"] = uuidv4();
    await commentRepository.createComment(data); 
}

const updateComment = async (data) => {
    const rowsAffected = await commentRepository.updateComment(data);
    return rowsAffected;
}

const deleteComment = async (data) => {
    const rowsAffected = await commentRepository.deleteComment(data);
    return rowsAffected;
}

export default {
    getUserAllComments,
    getBlogComments,
    createComment,
    updateComment,
    deleteComment
}