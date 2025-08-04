import { PrismaClient, User } from "../../generated/prisma";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
const prisma = new PrismaClient();

export const createUser = async (
  data: Omit<User, "id" | "isActive" | "createdAt" | "updatedAt" | "passwordUpdatedAt">
): Promise<User> => {
  const existingEmail = await prisma.user.findUnique({ where: { email: data?.email } });
  if (existingEmail) {
    throw new Error("Такой Email уже существует");
  }
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
  return await prisma.user.create({ data: { ...data, password: hashedPassword } });
};

export const getUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const updateUser = async (id: string, data: Partial<User>) => {
  return await prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({ where: { id } });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { email } });
};
