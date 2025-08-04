import { createUser, deleteUser, getUserByEmail, getUserById } from "../../../../services/userService";
import { PrismaClient } from "../../../../../generated/prisma";
import { UserCreateDto } from "../../../../dto/userCreate.dto";

const prisma = new PrismaClient();

describe("createUser", () => {
  const testEmail = "testcreate@example.com";
  const testPassword = "testpassword";

  beforeAll(async () => {
    // Удаляем тестового пользователя, если есть
    await prisma.user.delete({ where: { email: testEmail } }).catch(() => {});
  });

  afterAll(async () => {
    // Удаляем тестового пользователя после теста
    await prisma.user.delete({ where: { email: testEmail } }).catch(() => {});
  });

  it("успешно создает нового пользователя", async () => {
    const userData: UserCreateDto = {
      email: testEmail,
      firstName: "Test",
      secondName: "Create",
      roleId: 0,
      password: testPassword,
    };

    const newUser = await createUser(userData);
    expect(newUser).toBeDefined();
    expect(newUser.email).toBe(testEmail);
    expect(newUser).toHaveProperty("password"); // пароль хеширован
    // Проверяем, что пароль не равен исходному
    expect(newUser.password).not.toBe(testPassword);
  });

  it("выбрасывает ошибку при повторном email", async () => {
    const userData = {
      email: testEmail,
      firstName: "Test",
      secondName: "Duplicate",
      roleId: 0,
      password: testPassword,
    };

    await expect(createUser(userData)).rejects.toThrow("Такой Email уже существует");

    const newUser = await getUserByEmail(testEmail);
    expect(newUser).toHaveProperty("id");

    if (newUser) {
      await deleteUser(newUser.id);
      const deletedUser = await getUserById(newUser.id);
      expect(deletedUser).toBe(null);
    } else {
      throw new Error("Новый юзер не найден");
    }
  });
});
