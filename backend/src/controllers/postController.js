import { getAllPostsDB, Post } from "../model/postModel.js"

// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await getAllPostsDB()
        res.json({ message: "Get all posts successfully", data: posts });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}