import db from "../database/dbConnection.js";
import { comment, user, blog } from "../drizzle/schema.js";
import { eq, and, sql } from "drizzle-orm";

// to get specific user's all comments
const getUserAllComments = async ({ id }) => {
  try {
    const comments = await db
      .select()
      .from(comment)
      .innerJoin(
        user,
        and(
          eq(user.id, id),
          eq(user.id, comment.user_id),
          eq(comment.is_deleted, false),
          eq(user.is_active, true)
        )
      );

    return comments;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// to get particular blog's all comment
const getBlogComments = async ({ blog_id }) => {
  try {
    const comments = await db
      .select()
      .from(comment)
      .innerJoin(
        blog,
        and(eq(comment.blog_id, blog_id), eq(comment.is_deleted, false))
      );

    return comments;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// to add comment for specific blog by specific user
const createComment = async (comment_data) => {
  try {
    await db.insert(comment).values(comment_data);
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// to update comment
const updateComment = async (comment_data) => {
  try {
    const rowsAffected = await db
      .update(comment)
      .set({
        comment_text: comment_data.comment_text,
        updated_at: sql`CURRENT_TIMESTAMP`,
      })
      .where(
        and(
          eq(comment.user_id, comment_data.user_id),
          eq(comment.blog_id, comment_data.blog_id),
          eq(comment.is_deleted, false)
        )
      );
    
    return rowsAffected;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// to delete comment
const deleteComment = async ({user_id, blog_id}) => {
  try{
    const rowsAffected = await db
      .update(comment)
      .set({is_deleted: true})
      .where(and(eq(comment.blog_id, blog_id), eq(comment.user_id, user_id), eq(comment.is_deleted, false)));

    return rowsAffected;
  }
  catch(err){
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
}

export default { getUserAllComments, getBlogComments, createComment, updateComment, deleteComment };
