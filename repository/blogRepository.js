import db from "../database/dbConnection.js";
import { eq, and, sql } from "drizzle-orm";
import { blog, user } from "../drizzle/schema.js";

const getAllBlogs = async () => {
  try {
    const blogs = await db
      .select()
      .from(blog)
      .innerJoin(
        user,
        and(
          eq(blog.user_id, user.id),
          eq(user.is_active, true),
          eq(blog.is_deleted, false)
        )
      );
    return blogs;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// get specific blog
const getBlog = async ({ id }) => {
  try {
    const blog_data = await db.select().from(blog).where(eq(blog.id, id));
    return blog_data;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// get specific user's blog
const getUserBlogs = async ({ id }) => {
  try {
    const blogs = await db
      .select()
      .from(blog)
      .innerJoin(
        user,
        and(
          eq(blog.user_id, id),
          eq(user.is_active, true),
          eq(blog.is_deleted, false)
        )
      );

    return blogs;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// create blog
const createBlog = async (blog_data) => {
  try{
    await db.insert(blog).values(blog_data);
  }
  catch(err){
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
}

// for deleting particular blog using blog Id
const deleteBlog = async ({ id }) => {
  try {
    const rowsAffected = await db
      .update(blog)
      .set({ is_deleted: true })
      .where(and(eq(blog.id, id), eq(blog.is_deleted, false)));

    return rowsAffected;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// for updating particular blog
const updateBlog = async (updatedBlog) => {
  try {
    const rowsAffected = await db
      .update(blog)
      .set({
        title: updatedBlog.title,
        description: updatedBlog.description,
        updated_at: sql`CURRENT_TIMESTAMP`,
      })
      .where(and(eq(blog.id, updatedBlog.id), eq(blog.is_deleted, false)));

    return rowsAffected;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

export default { getAllBlogs, getBlog, getUserBlogs, deleteBlog, updateBlog, createBlog };