import db from "../database/dbConnection.js";
import { reaction, user } from "../drizzle/schema.js";
import { eq, and, count } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

// get user list of whoever liked particular blog
const getAllReactionLikes = async ({ blog_id }) => {  // not required
  try {
    const likes = await db
      .select()
      .from(reaction)
      .innerJoin(user, eq(reaction.user_id, user.id))
      .where(and(eq(reaction.blog_id, blog_id), eq(reaction.liked, true)));
    return likes;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// get user list of whoever disliked particular blog
const getAllReactionDislikes = async ({ blog_id }) => {  // not required
  try {
    const dislikes = await db
      .select()
      .from(reaction)
      .innerJoin(user, eq(reaction.user_id, user.id))
      .where(and(eq(reaction.blog_id, blog_id), eq(reaction.liked, false)));

    return dislikes;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// get all reaction count for particular blog
const getAllReactionCounts = async ({ blog_id }) => {  // not required
  try {
    const likes_count_result = await db
      .select({ count: count() })
      .from(reaction)
      .where(and(eq(reaction.blog_id, blog_id), eq(reaction.liked, true)));

    const dislikes_count_result = await db
      .select({ count: count() })
      .from(reaction)
      .where(and(eq(reaction.blog_id, blog_id), eq(reaction.liked, false)));

    return {
      likes_count: likes_count_result[0].count,
      dislikes_count: dislikes_count_result[0].count,
    };
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// update reaction
const updateReaction = async ({ b_id, u_id, liked }) => {  
  try {
    const isRecordFound = await db
      .select()
      .from(reaction)
      .where(and(eq(reaction.user_id, u_id), eq(reaction.blog_id, b_id)));
    if (isRecordFound.length === 0) {
      await db.insert(reaction).values({
        id: uuidv4(),
        blog_id: b_id,
        user_id: u_id,
        liked: liked ? true : false,
      });
    } else {
      await db
        .update(reaction)
        .set({
          liked: liked ? true : false,
        })
        .where(and(eq(reaction.user_id, u_id), eq(reaction.blog_id, b_id)));
    }
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

export default {
  getAllReactionLikes,
  getAllReactionCounts,
  getAllReactionDislikes,
  updateReaction,
};
