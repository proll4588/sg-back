import { calcTestOneResult } from '../../calcTestOne/calcTestOne.js';
import { prisma } from '../../controllers/prisma.controller.js';
import { TEST_ONE_PROCESSES_DEF, TEST_ONE_RESULT_DEF } from './constants.js';

export const getTestOneQuestions = async () => {
  return await prisma.testOneQuestions.findMany();
};

export const addAns = async (processId, questionId, ans) => {
  let candidate = await prisma.testOneAnswer.findFirst({
    where: {
      TestOneProcesses: { id: processId },
      questionId: questionId,
    },
  });

  if (candidate) {
    candidate = await prisma.testOneAnswer.update({
      where: { id: candidate.id },
      data: { answer: ans },
      select: TEST_ONE_PROCESSES_DEF,
    });
  } else {
    candidate = await prisma.testOneAnswer.create({
      data: {
        answer: ans,
        questionId: questionId,
        processId: processId,
      },
      select: TEST_ONE_PROCESSES_DEF,
    });
  }

  return candidate;
};

export const getTestOneByUserId = async (userId) => {
  return await prisma.testOneProcesses.findFirst({
    where: { userId: userId },
    select: TEST_ONE_PROCESSES_DEF,
  });
};

export const getTestOneByProcessId = async (processId) => {
  return await prisma.testOneProcesses.findUnique({
    where: { id: processId },
    select: TEST_ONE_PROCESSES_DEF,
  });
};

export const createTestOneProcess = async (userId) => {
  const newItem = await prisma.testOneProcesses.create({
    data: {
      startDate: new Date(),
      userId: userId,
    },
    select: TEST_ONE_PROCESSES_DEF,
  });

  return newItem;
};

export const completeTestOneProcess = async (processId) => {
  // TODO: Сделать проверку на ответы на все вопросы
  const data = await prisma.testOneProcesses.update({
    where: { id: processId },
    data: {
      complete: true,
      endDate: new Date(),
    },
    select: TEST_ONE_PROCESSES_DEF,
  });

  // Без await? чтоб не задерживать пользователя)
  await calcTestOneResult(processId);

  return data;
};

// Пока хз зачем
export const getAllTestOne = async () => {
  const ans = await prisma.testOneProcesses.findMany({
    select: TEST_ONE_PROCESSES_DEF,
  });

  return ans;
};

export const getTestOneResults = async () => {
  return await prisma.testOneResult.findMany({
    select: TEST_ONE_RESULT_DEF,
  });
};
