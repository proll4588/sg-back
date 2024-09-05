import { calc } from '../calcTestTwo/calcTestTwo.js';
import { prisma } from '../controllers/prisma.controller.js';

const TEST_TWO_PROCESS_SELECT = {
  id: true,
  complete: true,
  startDate: true,
  endDate: true,
  TestTwoAnswer: {
    select: {
      id: true,
      answer: true,
      TestTwoQuestions: {
        select: {
          id: true,
          text: true,
          position: true,
        },
      },
    },
  },
  User: {
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
  },
};

export const getTestTwoQuestions = async () => {
  return await prisma.testTwoQuestions.findMany();
};

export const getTestTwoProcessById = async (processId) => {
  return await prisma.testTwoProcesses.findUnique({
    where: { id: processId },
    select: TEST_TWO_PROCESS_SELECT,
  });
};

export const getTestTwoAllProcesses = async () => {
  return await prisma.testTwoProcesses.findMany({
    select: TEST_TWO_PROCESS_SELECT,
  });
};

export const getTestTwoByUserId = async (userId) => {
  return await prisma.testTwoProcesses.findFirst({
    where: { userId },
    select: TEST_TWO_PROCESS_SELECT,
  });
};

export const startTestTwo = async (userId) => {
  return await prisma.testTwoProcesses.create({
    data: { startDate: new Date(), userId },
    select: TEST_TWO_PROCESS_SELECT,
  });
};

export const answerTestTwo = async (processId, questionId, answer) => {
  const candidate = await prisma.testTwoAnswer.findFirst({
    where: { processId, questionId },
  });

  let ans;
  if (candidate) {
    ans = await prisma.testTwoAnswer.update({
      where: { id: candidate.id },
      data: { answer },
    });
  } else {
    ans = await prisma.testTwoAnswer.create({
      data: { processId, questionId, answer },
    });
  }

  return getTestTwoProcessById(ans.id);
};

export const completeTestTwo = async (processId) => {
  const data = await prisma.testTwoProcesses.update({
    where: { id: processId },
    data: { complete: true, endDate: new Date() },
    select: TEST_TWO_PROCESS_SELECT,
  });

  await calc(processId);

  return await getTestTwoProcessById(data.id);
};
