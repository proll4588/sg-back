import { USER_DEF } from '../User/constants.js';

export const TEST_ONE_LEVEL_DEF = {
  id: true,
  title: true,
};

export const TEST_ONE_SCALE_DEF = {
  id: true,
  title: true,
};

export const TEST_ONE_RESULT_ITEM_DEF = {
  id: true,
  result: true,
  TestOneScale: { select: TEST_ONE_SCALE_DEF },
  TestOneLevel: { select: TEST_ONE_LEVEL_DEF },
};

export const TEST_ONE_QUESTIONS_DEF = {
  id: true,
  position: true,
  text: true,
};

export const TEST_ONE_ANSWER_DEF = {
  id: true,
  answer: true,
  TestOneQuestions: { select: TEST_ONE_QUESTIONS_DEF },
};

export const TEST_ONE_PROCESSES_DEF = {
  id: true,
  complete: true,
  startDate: true,
  endDate: true,
  TestOneAnswer: { select: TEST_ONE_ANSWER_DEF },
  User: { select: USER_DEF },
};

export const TEST_ONE_RESULT_DEF = {
  id: true,
  TestOneProcesses: { select: TEST_ONE_PROCESSES_DEF },
  TestOneResultItem: { select: TEST_ONE_RESULT_ITEM_DEF },
};
