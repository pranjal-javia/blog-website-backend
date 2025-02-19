import { eq, sql, and, count } from "drizzle-orm";
import db from "../database/dbConnection.js";
import { user, blog, comment, reaction } from "../drizzle/schema.js";

const getAllUsers = async () => {
  try {
    const users = await db.select().from(user).where(eq(user.is_active, true));
    return users;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// get user by username
const getUserByUsername = async (username) => {
  try {
    const user_data = await db
      .select()
      .from(user)
      .where(and(eq(user.username, username.data), eq(user.is_active, true)));
    return user_data;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// get user by email
const getUserByEmail = async (email) => {
  try {
    
    const user_data = await db
      .select()
      .from(user)
      .where(and(eq(user.email, email), eq(user.is_active, true)));
    return user_data;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

// get user by id
const getUser = async (id) => {
  try {
    const result = await db.select().from(user).where(eq(user.id, id));

    const blogs = await db
      .select({
        ...blog,
        comment_count: count(comment.id),
        reaction_count: count(reaction.id)
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
      .where(and(eq(blog.user_id, id), eq(blog.is_deleted, false)))
      .groupBy(blog.id, comment.id, reaction.id);

    const user_data = { ...result[0], blogs: blogs };
    return user_data;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

const createUser = async (user_data) => {
  try {
    const rowsAffected = await db.insert(user).values(user_data);
    return rowsAffected;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

const updateUser = async (updatedUser) => {
  try {
    const rowsAffected = await db
      .update(user)
      .set({
        username: updatedUser.username,
        email: updatedUser.email,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        middle_name: updatedUser.middle_name,
        address: updatedUser.address,
        city: updatedUser.city,
        pincode: updatedUser.pincode,
        state: updatedUser.state,
        country: updatedUser.country,
        phone_number: updatedUser.phone_number,
        profile_url: updatedUser.profile_url,
        coverphoto_url: updatedUser.coverphoto_url,
        dob: updatedUser.dob,
        updated_at: sql`CURRENT_TIMESTAMP`,
      })
      .where(and(eq(user.id, updatedUser.id), eq(user.is_active, true)));

    return rowsAffected;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

const deleteUser = async (id) => {
  try {
    const rowsAffected = await db
      .update(user)
      .set({ is_active: false })
      .where(and(eq(user.id, id), eq(user.is_active, true)));

    return rowsAffected;
  } catch (err) {
    console.log(err);
    throw { status: 500, message: "Internal server error" };
  }
};

export default {
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getUser,
};
