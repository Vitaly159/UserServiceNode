import { Router } from "express";
import {
  registerUser,
  getUser,
  getAll,
  updateUserController,
  deleteUserController,
} from "../controllers/userController";

const router = Router();

router.post("/users", registerUser);
router.get("/users/:id", getUser);
router.get("/users", getAll);
router.put("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);

export default router;
