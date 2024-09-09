import { calc } from '../../calcTestTwo/calcTestTwo.js';
import { prisma } from '../../controllers/prisma.controller.js';
import {
  TEST_TWO_ANSWER_DEF,
  TEST_TWO_PROCESS_DEF,
  TEST_TWO_RESULT_DEF,
} from './constants.js';

export const getTestTwoQuestions = async () => {
  return await prisma.testTwoQuestions.findMany();
};

export const getTestTwoProcessById = async (processId) => {
  return await prisma.testTwoProcesses.findUnique({
    where: { id: processId },
    select: TEST_TWO_PROCESS_DEF,
  });
};

export const getTestTwoAllProcesses = async () => {
  return await prisma.testTwoProcesses.findMany({
    select: TEST_TWO_PROCESS_DEF,
  });
};

export const getTestTwoByUserId = async (userId) => {
  return await prisma.testTwoProcesses.findFirst({
    where: { userId },
    select: TEST_TWO_PROCESS_DEF,
  });
};

export const startTestTwo = async (userId) => {
  return await prisma.testTwoProcesses.create({
    data: { startDate: new Date(), userId },
    select: TEST_TWO_PROCESS_DEF,
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
      select: TEST_TWO_ANSWER_DEF,
    });
  } else {
    ans = await prisma.testTwoAnswer.create({
      data: { processId, questionId, answer },
      select: TEST_TWO_ANSWER_DEF,
    });
  }

  return ans;
};

export const completeTestTwo = async (processId) => {
  const data = await prisma.testTwoProcesses.update({
    where: { id: processId },
    data: { complete: true, endDate: new Date() },
    select: TEST_TWO_PROCESS_DEF,
  });

  await calc(processId);

  return data;
};

export const getTestTwoResults = async () => {
  const data = await prisma.testTwoResult.findMany({
    select: TEST_TWO_RESULT_DEF,
  });

  return data;
};
