import { USER_DEF } from '../User/constants.js';

export const TEST_TWO_QUESTIONS_DEF = {
  id: true,
  text: true,
  position: true,
};

export const TEST_TWO_ANSWER_DEF = {
  id: true,
  answer: true,
  TestTwoQuestions: { select: TEST_TWO_QUESTIONS_DEF },
};

export const TEST_TWO_PROCESS_DEF = {
  id: true,
  complete: true,
  startDate: true,
  endDate: true,
  TestTwoAnswer: { select: TEST_TWO_ANSWER_DEF },
  User: { select: USER_DEF },
};

export const TEST_TWO_RESULT_DEF = {
  id: true,
  kom: true,
  komResult: true,
  org: true,
  orgResult: true,
  TestTwoProcesses: { select: TEST_TWO_PROCESS_DEF },
};
