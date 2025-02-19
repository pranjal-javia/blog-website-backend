import userService from "../service/userService.js";
import {
  user_zod_schema,
  update_user_zod_schema
} from "../validation/userValidations.js";

const getAllUser = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    if (users.length > 0) {
      res.status(200).send(users);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

const getUser = async (req, res) => {
  // try {
  //   const isEmail = email_validation_zod.safeParse({ email: req.body.data });
  //   if (isEmail.success) {
  //     const user = await userService.getUserByEmail(req.body);
  //     if (!user) {
  //       res.status(404).send("User not found");
  //     }
  //     res.status(200).send(user);
  //   } else if (req.body.data.length > 0) {
  //     const user = await userService.getUserByUsername(req.body);
  //     if (!user) {
  //       res.status(404).send("User not found");
  //     }
  //     res.status(200).send(user);
  //   } else {
  //     res.status(400).send("Invalid input");
  //   }
  // } catch (err) {
  //   res.status(err.status || 500).send(err.message || "Internal Server Error");
  // }
  try{
    const user = await userService.getUser(req.params.id);
    res.status(200).send(user);
  }
  catch(err){
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

const createUser = async (req, res) => {
  try {
    const validation = user_zod_schema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }
    await userService.createUser(req.body);
    res.status(204).send();
  } catch (err) {
    res
      .status(err?.status || 500)
      .send(err?.message || "Internal server error");
  }
};

const updateUser = async (req, res) => {
  try {
    const validation = update_user_zod_schema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }
    req.body["id"] = req.params.id;
    const rowsAffected = await userService.updateUser(req.body);
    if(rowsAffected.rowCount > 0){
        res.status(204).send();
    }
    else{
        res.status(404).send("User not found");
    }
  } 
  catch (err) {
    res
      .status(err?.status || 500)
      .send(err?.message || "Internal server error");
  }
};

const deleteUser = async (req, res) => {
  try{
    console.log(req.params.id)
    const rowsAffected = await userService.deleteUser(req.params.id);
    if(rowsAffected > 0){
      res.status(204).send();
    }
    else{
      res.status(404).send("User not found");
    }
  }
  catch(err){
    res.status(err?.status || 500).send(err?.message || "Internal server error");
  }
}

export default { getAllUser, createUser, getUser, updateUser, deleteUser };