import { prisma } from '../../controllers/prisma.controller.js';
import { USER_DEF } from './constants.js';

export const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: USER_DEF,
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: USER_DEF,
  });
};

export const getUsersByRole = async (roleId) => {
  return await prisma.user.findMany({
    where: { roleId: roleId || undefined },
    select: USER_DEF,
  });
};

export const createUser = async (login, password, roleId) => {
  return await prisma.user.create({
    data: { login, password, roleId },
    select: USER_DEF,
  });
};

export const getUserData = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: USER_DEF,
  });
};

export const getUsersRoles = async () => {
  return await prisma.role.findMany({});
};

export const deleteUser = async (userId) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};

export const getUserByLogin = async (login) => {
  return await prisma.user.findFirst({
    where: {
      login,
    },
    select: { password: true, ...USER_DEF },
  });
};
