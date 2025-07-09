import { Request, Response } from "express";
import { createUser, getUserById, getAllUsers } from "../services/userService";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Ошибка при создании пользователя" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const user = await getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Пользователь не найден" });
    }
  } catch (err) {
    res.status(500).json({ error: "Ошибка при получении пользователя" });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ error: "Ошибка при получении списка" });
  }
};
