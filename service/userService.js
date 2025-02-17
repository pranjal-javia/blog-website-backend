import userRepository from "../repository/userRepository.js";

const getAllUsers = async () => {
  const users = await userRepository.getAllUsers();
  return users;
};

export default {getAllUsers};