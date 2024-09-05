import { prisma } from '../controllers/prisma.controller.js';

const KOM_MAP = [
  { start: 0.1, end: 0.45, value: 1 },
  { start: 0.46, end: 0.55, value: 2 },
  { start: 0.56, end: 0.65, value: 3 },
  { start: 0.66, end: 0.75, value: 4 },
  { start: 0.76, end: 1, value: 5 },
];

const ORG_MAP = [
  { start: 0.2, end: 0.55, value: 1 },
  { start: 0.56, end: 0.65, value: 2 },
  { start: 0.66, end: 0.7, value: 3 },
  { start: 0.71, end: 0.8, value: 4 },
  { start: 0.81, end: 1, value: 5 },
];

export const calc = async (processId) => {
  const ans = await prisma.testTwoAnswer.findMany({
    where: { processId },
    include: {
      TestTwoQuestions: {
        select: { position: true },
      },
    },
  });

  //
  //
  //
  //
  //

  let col1 = 0;
  let col2 = 0;
  let col3 = 0;
  let col4 = 0;

  ans
    .sort((a, b) => a.TestTwoQuestions.position - b.TestTwoQuestions.position)
    .forEach((el, index) => {
      switch (index % 4) {
        case 0:
          if (el.answer) col1++;
          break;

        case 1:
          if (el.answer) col2++;
          break;

        case 2:
          if (!el.answer) col3++;
          break;

        case 3:
          if (!el.answer) col4++;
          break;
      }
    });

  //
  //
  //
  //
  //

  const Kx = col1 + col3;
  const Ox = col2 + col4;

  const kom = Kx / 20;
  const org = Ox / 20;

  const komRes =
    KOM_MAP.find((el) => el.start <= kom && kom <= el.end).value || 0;
  const orgRes =
    ORG_MAP.find((el) => el.start <= org && org <= el.end).value || 0;

  await prisma.testTwoResult.create({
    data: { kom, org, komResult: komRes, orgResult: orgRes, processId },
  });
};
