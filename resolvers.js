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
  getStudentUsers,
  getUserById,
  getUsersByRole,
  getUsersRoles,
} from './models/User/user.js';
import {
  addAns,
  completeTestOneProcess,
  createTestOneProcess,
  getAllTestOne,
  getTestOneByUserId,
  getTestOneQuestions,
  getTestOneResults,
} from './models/TestOne/testOne.js';
import {
  answerTestTwo,
  completeTestTwo,
  getTestTwoAllProcesses,
  getTestTwoByUserId,
  getTestTwoQuestions,
  getTestTwoResults,
  startTestTwo,
} from './models/TestTwo/testTwo.js';
import { processPdf } from './models/TestThree/testThree.js';

const qRegistrate = async (login, password, roleId) =>
  await registrate(login, password, roleId);

const qLogin = async (log, password) => await login(log, password);

const qGetUsersRoles = async () => await getUsersRoles();
const qGetUsers = async (context, roleId) => {
  // checkUserAdmin(context);
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

const qGetTestTwoProcess = async () => {
  return await getTestTwoAllProcesses();
};

const qGetTestTwoQuestions = async () => {
  return await getTestTwoQuestions();
};

const qGetTestTwo = async (userId) => {
  return await getTestTwoByUserId(userId);
};

const qStartTestTwo = async (userId) => {
  return await startTestTwo(userId);
};

const qAnsTestTwo = async (processId, questionId, ans) => {
  return await answerTestTwo(processId, questionId, ans);
};

const qCompleteTestTwo = async (processId) => {
  return await completeTestTwo(processId);
};

const qGetTestOneResults = async () => {
  return await getTestOneResults();
};

const qGetTestTwoResults = async () => {
  return await getTestTwoResults();
};

const qProcessPdf = async (userId, file) => {
  return await processPdf(userId, file);
};

const qGetStudentUsers = async () => {
  return await getStudentUsers();
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
    getStudentUsers: async () => await qGetStudentUsers(),

    /* TEST ONE */
    // TODO: Разобраться с доступами
    getTestOneProcess: async () => await qGetTestOneProcess(),
    getTestOneQuestions: async () => await qGetTestOneQuestions(),
    getTestOne: async (_, { userId }) => await qGetTestOne(userId),

    getTestOneResults: async () => await qGetTestOneResults(),
    /* ======== */

    /* TEST TWO */
    getTestTwoProcess: async () => await qGetTestTwoProcess(),
    getTestTwoQuestions: async () => await qGetTestTwoQuestions(),
    getTestTwo: async (_, { userId }) => await qGetTestTwo(userId),
    getTestTwoResults: async () => await qGetTestTwoResults(),
    /* ======== */
  },
  Mutation: {
    registration: async (_, { login, password, roleId }) =>
      await qRegistrate(login, password, roleId),
    deleteUser: async (_, { userId }, context) =>
      await qDeleteUser(context, userId),

    /* TEST ONE */
    startTestOne: async (_, { userId }) => await qStartTestOne(userId),
    ansTestOne: async (_, { processId, questionId, ans }) =>
      await qAnsTestOne(processId, questionId, ans),
    completeTestOne: async (_, { processId }) =>
      await qCompleteTestOne(processId),
    /* ======== */

    /* TEST TWO */
    startTestTwo: async (_, { userId }) => await qStartTestTwo(userId),
    ansTestTwo: async (_, { processId, questionId, ans }) =>
      await qAnsTestTwo(processId, questionId, ans),
    completeTestTwo: async (_, { processId }) =>
      await qCompleteTestTwo(processId),
    /* ======== */

    /* TEST THREE */
    processPdf: async (_, { userId, file }) => await qProcessPdf(userId, file),
    /* ========== */
  },
};

export default resolvers;
