import express from "express";
import { getAll } from "../../../../src/controllers/userController";

// Мокаем сервис
jest.mock("../../../../src/services/userService");

const app = express();
app.get("/users", getAll);

describe("Тесты контроллера userController с учетом Prisma модели", () => {
  const mockUsers = [
    {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      email: "test1@example.com",
      firstName: "John",
      secondName: "Doe",
      roleId: 2,
    },
    {
      id: "b2c3d4e5-f6a7-8901-bcde-f1234567890a",
      email: "test2@example.com",
      firstName: "Jane",
      secondName: "Smith",
      roleId: 3,
    },
  ];

  test("контроллер getAll возвращает правильные данные", async () => {
    // Мокаем импортированный сервис
    jest.spyOn(require("../../../../src/services/userService"), "getAllUsers").mockResolvedValue(mockUsers);

    // Создаем фиктивные req и res
    const req = {} as any;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as any;

    await getAll(req, res);

    // Проверяем, что res.json вызван с правильными данными
    expect(res.json).toHaveBeenCalledWith(
      mockUsers.map((user) => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        secondName: user.secondName,
        roleId: user.roleId,
      }))
    );

    // Проверяем, что статус не выставлялся (по умолчанию 200)
    expect(res.status).not.toHaveBeenCalled();
  });
});
