import { prisma } from '../../controllers/prisma.controller.js';
import { throwNewGQLError } from '../../GraphQLError.js';
import { base64ToFile } from '../../utils/dataURLtoFile.js';
import { key_text } from './constants.js';
import { parsePdf } from './pars.js';
import pdf from 'pdf-parse';

const checkIsPdf = (fileBase64) => {
  return fileBase64.includes('data:application/pdf');
};

const checkIsTest = async (file) => {
  const { text } = await pdf(file);

  return !key_text
    .map((el) => text.includes(el.text))
    .some((el) => el === false);
};

export const processPdf = async (userId, fileBase64) => {
  /* Проверка на наличие результатов */
  const candidate = await prisma.testThreeProcess.findFirst({
    where: { userId },
  });

  if (candidate) throwNewGQLError('RESULTS_IS_ALREADY_EXIST');
  /* =============================== */

  /* Проверка на pdf */
  const isPdf = checkIsPdf(fileBase64);
  if (!isPdf) throwNewGQLError('WRONG_PDF_FILE');
  /* =============== */

  const file = base64ToFile(fileBase64);

  /* Проверка на верный формат данных в pdf */
  const isTest = await checkIsTest(file);
  if (!isTest) throwNewGQLError('WRONG_PDF_FILE');
  /* ====================================== */

  const res = await parsePdf(file);

  const process = await prisma.testThreeProcess.create({
    data: {
      date: new Date(),
      userId: userId,
    },
  });

  for (let i = 0; i < res.length; i++) {
    const item = res[i];
    await prisma.testThreeResult.create({
      data: {
        result: item.result,
        resultTitleId: item.id,
        processId: process.id,
      },
    });
  }
};
