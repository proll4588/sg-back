import { prisma } from '../controllers/prisma.controller.js';
import { TEST_ONE_ANS_MAP } from './constants.js';

// Заполнение всех данных
const start = async () => {
  const tests = await getAllCompletedTestOneProcesses();
  tests.map(createResultByProcess);
};

const createResultByProcess = async (test) => {
  const result = await prisma.testOneResult.create({
    data: { testOneProcessId: test.id },
  });

  const res = calculateTestByScales(test);

  for (var i = 0; i < res.length; i++) {
    const el = res[i];

    await prisma.testOneResultItem.create({
      data: {
        result: el.res,
        scaleId: el.id,
        testOneResultId: result.id,
        testOneLevelId: getHeightOfAns(el.min, el.max, el.res),
      },
    });
  }
};

const calculateTestByScales = (test) => {
  const testData = {
    ...test,
    TestOneAnswer: test.TestOneAnswer.reduce((prev, cur) => {
      prev[cur.TestOneQuestions.position] = cur.answer;
      return prev;
    }, []),
  };

  const res = TEST_ONE_ANS_MAP.map((el) => {
    return {
      id: el.id,
      title: el.title,
      max: el.max,
      min: el.min,
      res: el.questions.reduce((prev, cur) => {
        const testAns = testData.TestOneAnswer[cur.position];
        const bal = cur.positive ? testAns : transparentAns(testAns);

        prev += bal;

        return prev;
      }, 0),
    };
  });

  return res;
};

const getAllCompletedTestOneProcesses = async () => {
  const data = await prisma.testOneProcesses.findMany({
    where: { complete: true },
    select: {
      id: true,
      User: { select: { id: true, login: true } },
      TestOneAnswer: {
        select: {
          id: true,
          answer: true,
          TestOneQuestions: { select: { position: true } },
        },
      },
    },
  });

  return data.filter((el) => el.TestOneAnswer.length !== 0);
};

const transparentAns = (ans) => {
  switch (ans) {
    case 1:
      return 7;
    case 2:
      return 6;
    case 3:
      return 5;
    case 4:
      return 4;
    case 5:
      return 3;
    case 6:
      return 2;
    case 7:
      return 1;

    default:
      return 0;
  }
};

const getHeightOfAns = (min, max, res) => {
  const localMax = max - min;
  const step = localMax / 3;
  const cof = res / step;

  if (cof <= 1) return 3;
  if (cof <= 2) return 2;
  return 1;
};

// const intopritateAns = (res) => {
//   return res.map((el) => {
//     const hightOfAns = getHeightOfAns(el.res);
//     const res = RES_ANALYZE_MAP.find((el2) => el2.title === el.title).res[
//       hightOfAns
//     ];
//     return { ...el, height: res };
//   });
// };

start();
