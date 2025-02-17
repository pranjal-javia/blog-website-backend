import db from "../database/dbConnection.js";
import { comment, user } from "../drizzle/schema.js";
import { eq, and } from "drizzle-orm";

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
const getBlogComments = async ({blog_id, user_id}) => {
  try{
    const comments = await db.select().from(comment).innerJoin();
  }
  catch(err){
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
}

export default { getUserAllComments };
