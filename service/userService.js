import userRepository from "../repository/userRepository.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const getAllUsers = async () => {
  const users = await userRepository.getAllUsers();
  return users;
};

const getUser = async (id) => {
  const user = await userRepository.getUser(id);
  return user;
}

const createUser = async (user) => {
  const { password } = user;
  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(password, salt);
  user["password"] = hashedPassword;
  user["id"] = uuidv4();
  const rowsAffected = await userRepository.createUser(user);
  return rowsAffected;
};

const getUserByEmail = async (data) => {
  const user = await userRepository.getUserByEmail(data);
  return user;
};

const getUserByUsername = async (data) => {
  const user = await userRepository.getUserByUsername(data);
  return user;
};

const updateUser = async (user) => {
  const rowsAffected = await userRepository.updateUser(user);
  return rowsAffected;
};

const deleteUser = async (id) => {
  console.log(id)
  const rowsAffected = await userRepository.deleteUser(id);
  return rowsAffected;
}

export default {
  getAllUsers,
  createUser,
  getUserByEmail,
  getUserByUsername,
  updateUser,
  deleteUser,
  getUser
};
