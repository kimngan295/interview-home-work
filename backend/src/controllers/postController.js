import { createNewPostDB, deletePostDB, getAllPostsDB, getPostDetailsDB, getPostsForPageDB, searchPostsByTitleDB, updatePostDB } from "../model/postModel.js"
import sendResponse from "../utils/reponseHelper.js";

// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = 5; 

        // skip posts
        const skip = (page - 1) * limit;

        // get all posts with skip and limit
        const posts = await getPostsForPageDB(skip, limit);

        const totalPosts = await getAllPostsDB();
        const postsCount = totalPosts.length
        const totalPages = Math.ceil(postsCount / limit);

        sendResponse(res, 'success', 'Get all posts successfully', {
            posts,
            page,
            totalPages,
            postsCount,
        });
    } catch (error) {
        console.error(error.message);
        sendResponse(res, 'error', error.message, null, { code: error.code });
    }
}

// Get a post by ID

export const getPostDetails = async (req, res) => {
    try {
        const { postID } = req.params;

        const findPost = await getPostDetailsDB(postID);
        if (!findPost) {
            return sendResponse(res, 'error', 'Post Not Found', null, { code: 404 });
        }

        sendResponse(res, 'success', 'get post successfully', findPost);
    } catch (error) {
        console.error(error.message);
        sendResponse(res, 'error', error.message, null, { code: error.code });
    }
}

// create a new post
export const createPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const owner = req.user.userID;
        const newPost = ({
            owner: owner,
            title: title,
            content: content,
            tags: tags
        })
        const createdPost = await createNewPostDB(newPost);
        sendResponse(res, 'success', 'post created successfully', createdPost);
    } catch (error) {
        console.error(error.message);
        sendResponse(res, 'error', error.message, null, { code: error.code });
    }
}

// update a post
export const updatePost = async (req, res) => {
    try {
        const { postID } = req.params;
        const userID = req.user.userID;
        const { title, content, tags } = req.body;

        const findPost = await getPostDetailsDB(postID);
        const owner = findPost.owner
        if (!findPost) {
            return sendResponse(res, 'error', 'Post Not Found', null, { code: 404 });
        }

        if (userID != owner) {
            return sendResponse(res, 'error', 'Unauthorized to update this post', null, { code: 401 });
        }

        const newData = ({
            title: title,
            content: content,
            tags: tags
        })
        const updatedPost = await updatePostDB(postID, newData);
        sendResponse(res, 'success', 'post updated successfully', updatedPost);
    } catch (error) {
        console.error(error.message);
        sendResponse(res, 'error', error.message, null, { code: error.code });
    }
}

// delete post
export const deletePost = async (req, res) => {
    try {
        const { postID } = req.params;
        const userID = req.user.userID;

        const findPost = await getPostDetailsDB(postID);
        const owner = findPost.owner
        if (!findPost) {
            return sendResponse(res, 'error', 'Post Not Found', null, { code: 404 });
        }

        if (userID != owner) {
            return sendResponse(res, 'error', 'Unauthorized to delete this post', null, { code: 401 });
        }

        await deletePostDB(postID);
        sendResponse(res, 'success', 'post deleted successfully', null);
    } catch (error) {
        console.error(error.message);
        sendResponse(res, 'error', error.message, null, { code: error.code });
    }
}

// Create search post with title
export const searchPostByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        const posts = await searchPostsByTitleDB(title);
        if (posts.length === 0) {
            return sendResponse(res, 'success', 'No post found', null);
        }
        sendResponse(res, 'success', 'Search posts by title successfully', posts);
    } catch (error) {
        console.error(error.message);
        sendResponse(res, 'error', error.message, null, { code: error.code });
    }
}