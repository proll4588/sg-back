import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import {
  registrate,
  login,
  checkUserAdmin,
  context,
  checkUserAuth,
} from './auth.js';
import {
  deleteUser,
  getUserById,
  getUsersByRole,
  getUsersRoles,
} from './models/User/user.js';

const qRegistrate = async (login, password, roleId) =>
  await registrate(login, password, roleId);

const qLogin = async (log, password) => await login(log, password);

const qGetUsersRoles = async () => await getUsersRoles();
const qGetUsers = async (context, roleId) => {
  checkUserAdmin(context);
  return await getUsersByRole(roleId);
};

const qGetUser = async (context) => {
  checkUserAuth(context);
  return await getUserById(context.userId);
};

const qDeleteUser = async (context, userId) => {
  checkUserAdmin(context);
  await deleteUser(userId);
  return true;
};

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    login: async (_, { login, password }) => await qLogin(login, password),
    getUsersRoles: async () => await qGetUsersRoles(),
    // TODO: сделать пагинацию и поиск по логину?
    getUsers: async (_, { roleId }, context) =>
      await qGetUsers(context, roleId),
    getUser: async (_, __, context) => await qGetUser(context),
  },
  Mutation: {
    registration: async (_, { login, password, roleId }) =>
      await qRegistrate(login, password, roleId),
    deleteUser: async (_, { userId }, context) =>
      await qDeleteUser(context, userId),
  },
};

export default resolvers;
