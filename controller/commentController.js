import commentService from "../service/commentService.js";

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

// get specific blogs comments
const getBlogComments = async (req, res) => {
    try{
        // const comments = await 
    }
    catch(err){
        res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
}

export default {getUserAllComments};