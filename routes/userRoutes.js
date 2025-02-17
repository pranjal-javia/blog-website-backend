import express from "express";
import userController from "../controller/userController.js"

const router = express.Router();

router.get("/", userController.getAllUser);
router.post("/", userController.getUser);
router.post("/create", userController.createUser);
router.patch("/update", userController.updateUser);
router.delete("/delete", userController.deleteUser);

export default router;