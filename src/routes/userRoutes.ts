import { Router } from "express";
import { registerUser, getUser, getAll } from "../controllers/userController";

const router = Router();

router.post("/users", registerUser);
router.get("/users/:id", getUser);
router.get("/users", getAll);

export default router;
