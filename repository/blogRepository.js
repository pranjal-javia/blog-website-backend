import db from "../database/dbConnection.js";
import { eq, and, sql, desc, count } from "drizzle-orm";
import { blog, user, reaction, comment } from "../drizzle/schema.js";

// to get all blog
const getAllBlogs = async ({ offset, limit }) => {
  try {
    const blogs = await db
      .select({
        ...blog,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        profile_url: user.profile_url,
        like_count: count(reaction.id),
        comment_count: count(comment.id),
      })
      .from(blog)
      .innerJoin(
        user,
        and(
          eq(blog.user_id, user.id),
          eq(user.is_active, true),
          eq(blog.is_deleted, false)
        )
      )
      .leftJoin(
        reaction,
        and(eq(blog.id, reaction.blog_id), eq(reaction.liked, true))
      )
      .leftJoin(
        comment,
        and(eq(blog.id, comment.blog_id), eq(comment.is_deleted, false))
      )
      .groupBy(blog.id, user.id)
      .orderBy(desc(blog.created_at))
      .limit(limit)
      .offset(offset);
    return blogs;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// to get total blog count
const getAllBlogCounts = async () => {
  try {
    const blogs = await db.select({ count: count() }).from(blog).where(eq(blog.is_deleted, false));
    return blogs;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// get specific
const getBlog = async (id) => {
  try {
    const result = await db
      .select({
        ...blog,
        comment_count: count(comment.id),
        reaction_count: count(reaction.id),
      })
      .from(blog)
      .leftJoin(
        comment,
        and(eq(comment.blog_id, blog.id), eq(comment.is_deleted, false))
      )
      .leftJoin(
        reaction,
        and(eq(reaction.blog_id, blog.id), eq(reaction.liked, true))
      )
      .where(and(eq(blog.id, id), eq(blog.is_deleted, false)))
      .groupBy(blog.id, comment.id, reaction.id);

    const comments = await db
      .select(
        {
          ...comment,
          username: user.username
        }
      )
      .from(comment)
      .innerJoin(
        user,
        eq(comment.user_id, user.id)
      )
      .where(eq(comment.blog_id, id));

    const reactions = await db
      .select(
        {
          id: user.id,
          username: user.username
        }
      )
      .from(reaction)
      .innerJoin(
        user,
        eq(reaction.user_id, user.id)
      )
      .where(and(eq(reaction.blog_id, id), eq(reaction.liked, true)));

    const blog_data = {
      ...result[0],
      comments: comments,
      reactions: reactions,
    };
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
  try {
    await db.insert(blog).values(blog_data);
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

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

export default {
  getAllBlogs,
  getBlog,
  getUserBlogs,
  deleteBlog,
  updateBlog,
  createBlog,
  getAllBlogCounts,
};
