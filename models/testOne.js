import { calcTestOneResult } from '../calcTestOne/calcTestOne.js';
import { prisma } from '../controllers/prisma.controller.js';

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
    await prisma.testOneAnswer.update({
      where: { id: candidate.id },
      data: { answer: ans },
    });
  } else {
    candidate = await prisma.testOneAnswer.create({
      data: {
        answer: ans,
        questionId: questionId,
        processId: processId,
      },
    });
  }

  return getTestOneByProcessId(processId);
};

export const getTestOneByUserId = async (userId) => {
  return await prisma.testOneProcesses.findFirst({
    where: { userId: userId },
    select: {
      id: true,
      complete: true,
      startDate: true,
      endDate: true,
      TestOneAnswer: {
        select: {
          id: true,
          answer: true,
          TestOneQuestions: {
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
    },
  });
};

export const getTestOneByProcessId = async (processId) => {
  return await prisma.testOneProcesses.findUnique({
    where: { id: processId },
    select: {
      id: true,
      complete: true,
      startDate: true,
      endDate: true,
      TestOneAnswer: {
        select: {
          id: true,
          answer: true,
          TestOneQuestions: {
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
    },
  });
};

export const createTestOneProcess = async (userId) => {
  const newItem = await prisma.testOneProcesses.create({
    data: {
      startDate: new Date(),
      userId: userId,
    },
  });

  return await getTestOneByProcessId(newItem.id);
};

export const completeTestOneProcess = async (processId) => {
  // TODO: Сделать проверку на ответы на все вопросы
  await prisma.testOneProcesses.update({
    where: { id: processId },
    data: {
      complete: true,
      endDate: new Date(),
    },
  });

  // Без await? чтоб не задерживать пользователя)
  await calcTestOneResult(processId);

  return getTestOneByProcessId(processId);
};

// Пока хз зачем
export const getAllTestOne = async () => {
  const ans = await prisma.testOneProcesses.findMany({
    select: {
      id: true,
      complete: true,
      startDate: true,
      endDate: true,
      TestOneAnswer: {
        select: {
          id: true,
          answer: true,
          TestOneQuestions: {
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
    },
  });

  return ans;
};

export const getTestOneResults = async () => {
  return await prisma.testOneResult.findMany({
    select: {
      id: true,
      TestOneProcesses: {
        select: {
          id: true,
          complete: true,
          startDate: true,
          endDate: true,
          TestOneAnswer: {
            select: {
              id: true,
              answer: true,
              TestOneQuestions: {
                select: {
                  id: true,
                  position: true,
                  text: true,
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
        },
      },
      TestOneResultItem: {
        select: {
          id: true,
          result: true,
          TestOneScale: {
            select: {
              id: true,
              title: true,
            },
          },
          TestOneLevel: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });
};
