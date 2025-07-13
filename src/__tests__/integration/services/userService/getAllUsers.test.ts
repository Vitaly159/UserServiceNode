import request from "supertest";
import express from "express";
import { getAll } from "../../../../controllers/userController";
import { getAllUsers } from "../../../../services/userService";

// Мокаем сервис
jest.mock("../../../../services/userService");

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

  beforeEach(() => {
    (getAllUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("успешный ответ с правильной структурой и типами", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(mockUsers.length);

    response.body.forEach((user, index) => {
      const original = mockUsers[index];

      const keys = Object.keys(original).sort();
      expect(keys).toEqual(["email", "firstName", "secondName", "roleId", "id"].sort());

      expect(typeof user.id).toBe("string");
      expect(typeof user.email).toBe("string");
      expect(typeof user.firstName).toBe("string");
      expect(typeof user.secondName).toBe("string");
      expect(typeof user.roleId).toBe("number");

      expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });
});
