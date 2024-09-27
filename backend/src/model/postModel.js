import mongoose from 'mongoose';

// Create schema for Post
const postSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
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
    },
    tags: { type: [String] },
}, { collection: 'posts', versionKey: false });

export const Post = mongoose.model('Post', postSchema);

// Function get all post
export async function getAllPostsDB() {
    try {
        const posts = await Post.find({});
        return posts;
    } catch (error) {
        console.error('Error getting posts from DB:', error);
        throw error;
    }
}

// Function get posts limited for page
    export async function getPostsForPageDB(skip, limit) {
        try {
            const posts = await Post.find({})
               .sort({ created_at: -1 })
               .skip(skip)
               .limit(limit);
            return posts;
        } catch (error) {
            console.error('Error getting posts for page from DB:', error);
            throw error;
        }
    }

// Function get post details
export async function getPostDetailsDB(postID) {
    try {
        const post = await Post.findById(postID);
        if (!post) {
            throw new Error('Post not found');
        }
        return post;
    } catch (error) {
        console.error('Error getting post details from DB:', error);
        throw error;
    }
}

// Function create a new post
export async function createNewPostDB(data) {
    try {
        const newPost = await Post.create(data);
        return newPost;
    } catch (error) {
        console.error('Error creating post in DB:', error);
        throw error;
    }
}

// Function update a post
export async function updatePostDB(postID, newData) {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postID,
            { $set: { ...newData, updated_at: Date.now() } },
            { new: true }
        );

        if (!updatedPost) {
            throw new Error('Post not found');
        }

        return updatedPost;
    } catch (error) {
        console.error('Error updating post in DB:', error);
        throw error;
    }
}

// Function delete a post
export async function deletePostDB(postID) {
    try {
        const deletedPost = await Post.findByIdAndDelete(postID);
        if (!deletedPost) {
            throw new Error('Post not found');
        }
        return deletedPost;
    } catch (error) {
        console.error('Error deleting post from DB:', error);
        throw error;
    }
}

// Function search post by title
export async function searchPostsByTitleDB(title) {
    try {
        const posts = await Post.find({ title: { $regex: title, $options: 'i' } });
        return posts;
    } catch (error) {
        console.error('Error searching posts by title:', error);
        throw error;
    }
}