import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import { registrate, login } from './auth.js';
import { getUsersRoles } from './models/User/user.js';

const qRegistrate = async (login, password, roleId) =>
  await registrate(login, password, roleId);

const qLogin = async (log, password) => await login(log, password);

const qGetUsersRoles = async () => await getUsersRoles();

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    login: async (_, { login, password }) => await qLogin(login, password),
    getUsersRoles: async () => await qGetUsersRoles(),
  },
  Mutation: {
    registration: async (_, { login, password, roleId }) =>
      await qRegistrate(login, password, roleId),
  },
};

export default resolvers;
