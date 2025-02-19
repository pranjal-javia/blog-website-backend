import blogRepository from "../repository/blogRepository.js";
import { v4 as uuidv4 } from "uuid";

const getAllBlogs = async(pageData) => {
    const blogs = await blogRepository.getAllBlogs(pageData);
    return blogs;
}

const getAllBlogCounts = async () => {
    const result = await blogRepository.getAllBlogCounts();
    return result[0].count;
}

const getBlog = async (id) => {
    const blog = await blogRepository.getBlog(id);
    return blog;
}

const getUserBlogs = async (data) => {
    const blogs = await blogRepository.getUserBlogs(data);
    return blogs;
}

const createBlog = async (blog) => {
    blog["id"] = uuidv4();
    await blogRepository.createBlog(blog);
}

const deleteBlog = async (data) => {
    const rowsAffected = await blogRepository.deleteBlog(data);
    return rowsAffected;
}

const updateBlog = async (data) => {
    const rowsAffected = await blogRepository.updateBlog(data);
    return rowsAffected;
}

export default {
    getAllBlogs,
    getBlog,
    getUserBlogs,
    deleteBlog,
    updateBlog,
    createBlog,
    getAllBlogCounts
}