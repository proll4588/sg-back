import { prisma } from '../controllers/prisma.controller.js';

export const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      login: true,
      Role: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      login: true,
      Role: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

export const getUsersByRole = async (roleId) => {
  return await prisma.user.findMany({
    where: { roleId: roleId || undefined },
    select: {
      id: true,
      login: true,
      Role: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

export const getUserByLogin = async (login) => {
  return await prisma.user.findFirst({
    where: {
      login,
    },
    select: {
      id: true,
      login: true,
      password: true,
      roleId: true,
      Role: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

export const createUser = async (login, password, roleId) => {
  return await prisma.user.create({
    data: {
      login,
      password,
      roleId,
    },
  });
};

export const getUserData = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      login: true,
      Role: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

export const getUsersRoles = async () => {
  return await prisma.role.findMany({});
};

export const deleteUser = async (userId) => {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};
