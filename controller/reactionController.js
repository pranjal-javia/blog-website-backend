import reactionService from "../service/reactionService.js";

const getAllReactionLikes = async (req, res) => {
    try{
        const likes = await reactionService.getAllReactionLikes(req.body);
        if(likes.length > 0){
            res.status(200).send(likes);
        }
        else{
            res.status(404).send("No likes found");
        }
    }
    catch(err){
        res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
}

const getAllReactionDislikes = async (req, res) => {
    try{
        const dislikes = await reactionService.getAllReactionDislikes(req.body);
        if(dislikes.length > 0){
            res.status(200).send(dislikes);
        }
        else{
            res.status(404).send("No dislikes found");
        }
    }
    catch(err){
        res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
}

const getAllReactionCounts = async (req, res) => {
    try{
        const {likes_count, dislikes_count} = await reactionService.getAllReactionCounts(req.body);
        res.status(200).send({likes_count, dislikes_count});
    }
    catch(err){
        res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
}

const updateReaction = async (req, res) => {
    try{
        await reactionService.updateReaction(req.body);
        res.status(204).send();
    }
    catch(err){
        res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
}

export default {
    getAllReactionLikes,
    getAllReactionCounts,
    getAllReactionDislikes,
    updateReaction
}