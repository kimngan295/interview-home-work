import mongoose from 'mongoose';

// create schema for User
const commentSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    created_at: {
        type: String,
        default: () => {
            const currentDate = new Date();
            // convert to YYYY-MM-DD
            return currentDate.toISOString().split('T')[0];
        }
    },
    updated_at: {
        type: String,
        default: () => {
            const currentDate = new Date();
            // convert to YYYY-MM-DD
            return currentDate.toISOString().split('T')[0];
        }
    }
}, { collection: 'comments', versionKey: false });

export const Comment = mongoose.model('Comment', commentSchema);

// Function create new comment
export async function createNewCommentDB(data) {
    try {
        const newComment = await Comment.create(data);
        return newComment;
    } catch (error) {
        throw new Error(error.message)
    }
}

// Function update comment
export async function updateCommentDB(commentID, data) {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentID, data, { new: true });
        if (!updatedComment) {
            throw new Error('Comment not found');
        }
        return updatedComment;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function get comment by ID
export async function getCommentByID(commentID) {
    try {
        console.log("comment ID: " + commentID);
        const comment = await Comment.findById(commentID);
        return comment;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function delete comment
export async function deleteCommentDB(commentID) {
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentID);
        if (!deletedComment) {
            throw new Error('Comment not found');
        }
        return deletedComment;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function get all comments for a post by postID
export async function getAllCommentsByPostID(postID) {
    try {
        const comments = await Comment.find({ post: postID }).sort({ created_at: -1 });
        return comments;
    } catch (error) {
        throw new Error(error.message);
    }
}