import request from "supertest";
import express from "express";
import { getUserById } from "../../../../services/userService";
import { getUser } from "../../../../controllers/userController";

// Мокаем сервис
jest.mock("../../../../services/userService");

const app = express();
app.get("/users/:id", getUser);

describe("Тесты контроллера getUser", () => {
  const mockUser = {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    email: "test@example.com",
    firstName: "John",
    secondName: "Doe",
    roleId: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("успешное получение пользователя", async () => {
    (getUserById as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).get("/users/" + mockUser.id);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: mockUser.id,
      email: mockUser.email,
      firstName: mockUser.firstName,
      secondName: mockUser.secondName,
      roleId: mockUser.roleId,
    });
    const keys = Object.keys(response.body).sort();
    expect(keys).toEqual(["email", "firstName", "secondName", "roleId", "id"].sort());

    expect(typeof response.body.id).toBe("string");
    expect(typeof response.body.email).toBe("string");
    expect(typeof response.body.firstName).toBe("string");
    expect(typeof response.body.secondName).toBe("string");
    expect(typeof response.body.roleId).toBe("number");

    expect(response.body.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test("пользователь не найден (404)", async () => {
    (getUserById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/users/nonexistent-id");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Пользователь не найден" });
  });
});
