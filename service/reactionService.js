import reactionRepository from "../repository/reactionRepository.js";

const getAllReactionLikes = async(data) => {
    const likes = await reactionRepository.getAllReactionLikes(data);
    return likes;
}

const getAllReactionDislikes = async (data) => {
    const dislikes = await reactionRepository.getAllReactionDislikes(data);
    return dislikes;
}

const getAllReactionCounts = async (data) => {
    const counts = await reactionRepository.getAllReactionCounts(data);
    return counts;
}

const updateReaction = async (data) => {
    await reactionRepository.updateReaction(data);
}

export default {
    getAllReactionLikes,
    getAllReactionCounts,
    getAllReactionDislikes,
    updateReaction
}