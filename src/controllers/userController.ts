import { Request, Response } from "express";
import { createUser, getUserById, getAllUsers } from "../services/userService";
import { UserDto } from "../dto/user.dto";

export const registerUser = async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  const userDto: UserDto = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    secondName: user.secondName,
  };
  res.status(201).json(userDto);
};

export const getUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await getUserById(id);
  if (user) {
    const userDto: UserDto = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      secondName: user.secondName,
    };
    res.json(userDto);
  } else {
    res.status(404).json({ error: "Пользователь не найден" });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  const usersDto: UserDto[] = users.map((user) => ({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    secondName: user.secondName,
  }));
  res.json(usersDto);
};
