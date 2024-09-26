import { createNewCommentDB, deleteCommentDB, getCommentByID, updateCommentDB } from "../model/commentModel.js";
import sendResponse from "../utils/reponseHelper.js";

// create new comment
export const createNewComment = async (req, res) => {
    try {
        const { content } = req.body;
        const userID = req.user.userID;
        const postID = req.params.postID;

        const newData = ({
            owner: userID,
            post: postID,
            content: content
        })

        const newComment = await createNewCommentDB(newData)
        sendResponse(res, 'success', 'create comment successfully', newComment)
    } catch (error) {
        sendResponse(res, 'error', error.message, null, { code: error.code });
    }
}

// update comment

export const updateComment = async (req, res) => {
    try {
        const { content } = req.body;
        const commentID = req.params.commentID;
        const userID = req.user.userID;

        const findComment = await getCommentByID(commentID);
        if(!findComment){
            return sendResponse(res, 'error', 'comment not found', null, { code: 404 });
        }

        const owner = findComment.owner;
        if(owner != userID){
            return sendResponse(res, 'error', 'unauthorized to update this comment', null, { code: 403 });
        }

        const updatedData = ({
            content: content
        });

        const updatedComment = await updateCommentDB(commentID, updatedData);
        sendResponse(res, 'success', 'update comment successfully', updatedComment);
    } catch (error) {
        sendResponse(res, 'error', error.message, null, { code: error.code });
    }
}

// delete comment
export const deleteComment = async (req, res) => {
    try {
        const commentID = req.params.commentID;
        const userID = req.user.userID;

        const findComment = await getCommentByID(commentID);
        if(!findComment){
            return sendResponse(res, 'error', 'comment not found', null, { code: 404 });
        }

        const owner = findComment.owner;
        if(owner != userID){
            return sendResponse(res, 'error', 'unauthorized to delete this comment', null, { code: 403 });
        }

        await deleteCommentDB(commentID);
        sendResponse(res, 'success', 'delete comment successfully');
    } catch (error) {
        sendResponse(res, 'error', error.message, null, { code: error.code });
    }
}