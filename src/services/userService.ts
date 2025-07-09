import { PrismaClient, User, Prisma } from "../../generated/prisma";

const prisma = new PrismaClient();

export const createUser = async (data: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> => {
  return await prisma.user.create({ data });
};

export const getUserById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
  return await prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({ where: { id } });
};
