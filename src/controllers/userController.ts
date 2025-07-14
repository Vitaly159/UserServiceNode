import { Request, Response } from "express";
import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserByEmail as _getUserByEmail,
} from "../services/userService";
import { UserDto } from "../dto/user.dto";
import { UserCreateDto } from "../dto/userCreate.dto";
import { validate } from "class-validator";
import { UpdateUserDto } from "../dto/updateUser.dto";

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Создать нового пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: Пользователь создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const registerUser = async (req: Request, res: Response) => {
  try {
    const userDto = Object.assign(new UserCreateDto(), req.body);
    const errors = await validate(userDto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const user = await createUser(userDto);
    res.status(201).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      secondName: user.secondName,
    });
  } catch (err) {
    const textError = (err as { message: string }).message;
    res.status(500).json({ error: textError });
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    if (user) {
      const userDto: UserDto & { id: string } = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        secondName: user.secondName,
        roleId: user.roleId,
      };
      res.json(userDto);
    } else {
      res.status(404).json({ error: "Пользователь не найден" });
    }
  } catch (err) {
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const user = await _getUserByEmail(email);
    if (user) {
      const userDto: UserDto & { password: string; id: string } = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        secondName: user.secondName,
        roleId: user.roleId,
        password: user.password,
      };
      res.json(userDto);
    } else {
      res.status(404).json({ error: "Пользователь не найден" });
    }
  } catch (err) {
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получить список пользователей
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const getAll = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    const usersDto: UserDto[] = users.map((user) => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      secondName: user.secondName,
      roleId: user.roleId,
    }));
    res.json(usersDto);
  } catch (err) {
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Обновить пользователя по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Пользователь обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Ошибка валидации
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка при обновлении
 */
export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userDto = Object.assign(new UpdateUserDto(), req.body);
    const errors = await validate(userDto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const updatedUser = await updateUser(id, userDto);
    res.json({
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      secondName: updatedUser.secondName,
      roleId: updatedUser.roleId,
    });
  } catch (err) {
    res.status(500).json({ error: "Ошибка при обновлении пользователя" });
  }
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Удалить пользователя по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Пользователь удален
 *       404:
 *         description: Пользователь не найден
 *       500:
 *         description: Ошибка при удалении
 */
export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Ошибка при удалении пользователя" });
  }
};
