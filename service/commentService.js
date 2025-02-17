import commentRepository from "../repository/commentRepository.js";

const getUserAllComments = async (data) => {
    const comments = await commentRepository.getUserAllComments(data);
    return comments;
}

export default {
    getUserAllComments
}