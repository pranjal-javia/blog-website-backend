import express from "express";
import userController from "../controller/userController.js"

const router = express.Router();

router.get("/", userController.getAllUser);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.post("/:id/delete", userController.deleteUser);

export default router;