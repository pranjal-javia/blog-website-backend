import blogService from "../service/blogService.js";
import { blog_zod_schema, update_blog_zod_schema } from "../validation/blogValidation.js";

const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page-1) * limit;
    const total_records = await blogService.getAllBlogCounts();
    const total_page = Math.ceil(total_records / limit);
    const blogs = await blogService.getAllBlogs({offset, limit});

    const pagination = {
      "total_records": total_records,
      "current_page": page,
      "total_pages": total_page,
      "next_page": page === total_page ? null : page + 1,
      "pre_page": page === 1 ? null : page - 1
    }

    if (blogs.length > 0) {
      res.status(200).send({data: blogs, pagination: pagination});
    } else {
      res.status(200).send("No blogs found"); // changed to 200 because page is there but 
    }
  } catch (err) {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

// this is not required
// const getAllBlogCounts = async (req, res) => {
//   try{
//     const count = await blogService.getAllBlogCounts();
//     res.status(200).send(count);
//   }
//   catch(err){
//     res.status(err.status || 500).send(err.message || "Internal Server Error");
//   }
// }

const getBlog = async (req, res) => {
  try {
    const blog = await blogService.getBlog(req.params.id);
    if (!blog) {
      res.status(404).send("Blog not found");
    } else {
      res.status(200).send(blog);
    }
  } catch (err) {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getUserBlogs(req.body);
    if (blogs.length > 0) {
      res.status(200).send(blogs);
    } else {
      res.status(404).send("No blogs found for user");
    }
  } catch (err) {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

const createBlog = async (req, res) => {
  try{
    const validation = blog_zod_schema.safeParse(req.body);
    if(!validation.success){
      return res.status(400).json({ error: validation.error.format() });
    }
    await blogService.createBlog(req.body);
    res.status(204).send();
  }
  catch(err){
    res
      .status(err?.status || 500)
      .send(err?.message || "Internal server error");
  }
}

const deleteBlog = async (req, res) => {
  try {
    const rowsAffected = await blogService.deleteBlog(req.body);

    if (rowsAffected.rowCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (err) {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

const updateBlog = async (req, res) => {
  try {
    req.body["id"] = req.params.id;
    const validation = update_blog_zod_schema.safeParse(req.body);
    if(!validation.success){
      return res.status(400).json({ error: validation.error.format() });
    }
    const rowsAffected = await blogService.updateBlog(req.body);

    if(rowsAffected.rowCount > 0){
        res.status(204).send();
    }
    else{
        res.status(404).send("Blog not found");
    }
  } 
  catch (err) {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

export default { getAllBlogs, getBlog, getUserBlogs, deleteBlog, updateBlog, createBlog };
