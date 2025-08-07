import { registerUser } from "../../../../controllers/userController";
import { validate } from "class-validator";
import { createUser } from "../../../../services/userService";
import { UserCreateDto } from "../../../../dto/userCreate.dto";

jest.mock("../../../../services/userService");
jest.mock("class-validator");

const newUser: UserCreateDto = {
  email: "test@example.com",
  firstName: "John",
  secondName: "Doe",
  password: "password123",
  roleId: 0,
};

describe("Тесты registerUser", () => {
  const req = {
    body: newUser,
  } as any;

  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("успешная регистрация", async () => {
    (validate as jest.Mock).mockResolvedValue([]); // ошибок нет

    const createdUser = {
      id: "123",
      email: newUser.email,
      firstName: newUser.firstName,
      secondName: newUser.secondName,
    };

    (createUser as jest.Mock).mockResolvedValue(createdUser);

    await registerUser(req, res);

    expect(validate).toHaveBeenCalledWith(expect.anything());
    expect(createUser).toHaveBeenCalledWith(expect.objectContaining(req.body));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdUser);
  });

  test("валидационные ошибки (400)", async () => {
    const errors = [{ property: "password", constraints: { length: "Пароль должен быть от 8 до 20 символов" } }];
    (validate as jest.Mock).mockResolvedValue(errors);

    await registerUser(req, res);

    expect(validate).toHaveBeenCalledWith(expect.anything());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors });
    expect(createUser).not.toHaveBeenCalled();
  });

  test("ошибка сервера (500)", async () => {
    (validate as jest.Mock).mockResolvedValue([]); // ошибок нет
    (createUser as jest.Mock).mockRejectedValue(new Error("Ошибка базы"));

    await registerUser(req, res);

    expect(createUser).toHaveBeenCalledWith(expect.objectContaining(req.body));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Ошибка базы" });
  });
});
