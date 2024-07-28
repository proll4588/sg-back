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
} from './models/user.js';
import {
  addAns,
  completeTestOneProcess,
  createTestOneProcess,
  getAllTestOne,
  getTestOneByUserId,
  getTestOneQuestions,
} from './models/testOne.js';

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

const qGetTestOneProcess = async () => {
  return await getAllTestOne();
};

const qGetTestOneQuestions = async () => {
  return await getTestOneQuestions();
};

const qStartTestOne = async (userId) => {
  return await createTestOneProcess(userId);
};

const qGetTestOne = async (userId) => {
  return await getTestOneByUserId(userId);
};

const qAnsTestOne = async (processId, questionId, ans) => {
  return await addAns(processId, questionId, ans);
};

const qCompleteTestOne = async (processId) => {
  return await completeTestOneProcess(processId);
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

    // TODO: Разобраться с доступами
    getTestOneProcess: async () => await qGetTestOneProcess(),
    getTestOneQuestions: async () => await qGetTestOneQuestions(),
    getTestOne: async (_, { userId }) => await qGetTestOne(userId),
  },
  Mutation: {
    registration: async (_, { login, password, roleId }) =>
      await qRegistrate(login, password, roleId),
    deleteUser: async (_, { userId }, context) =>
      await qDeleteUser(context, userId),

    // Test one
    startTestOne: async (_, { userId }) => await qStartTestOne(userId),
    ansTestOne: async (_, { processId, questionId, ans }) =>
      await qAnsTestOne(processId, questionId, ans),
    completeTestOne: async (_, { processId }) =>
      await qCompleteTestOne(processId),
  },
};

export default resolvers;
