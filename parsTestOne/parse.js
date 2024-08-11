import { prisma } from '../controllers/prisma.controller.js';
import csv from 'csv-parser';
import fs from 'fs';
import dayjs from 'dayjs';

const results = [];

fs.createReadStream('parsTestOne/data.csv')
  .pipe(
    csv({
      separator: ';',
      mapHeaders: ({ header }) => header.split(' ')[0].trim(),
    })
  )
  .on('data', (data) => results.push(data))
  .on('end', () => {
    start();
    // console.log(results);
  });

const start = async () => {
  let data = results.map((el) => {
    let login;
    let ans = [];
    let date;

    for (const key in el) {
      switch (key) {
        case 'Адрес':
          login = el[key];
          continue;

        case 'Фамилия,':
          continue;

        case 'Отметка':
          date = dayjs(el[key], 'D.M.YYYY HH:mm:ss').toDate();
          continue;

        default:
          //   console.log(key, el[key]);
          ans[Number(key)] = Number(el[key]);
          continue;
      }
    }

    return {
      login,
      date,
      ans,
    };
  });

  // console.log(data);

  for (var i = 0; i < data.length; i++) {
    const el = data[i];

    const user = await createNewUser(el.login);
    const process = await createProcess(user.id, el.date);

    for (var j = 0; j < el.ans.length; j++) {
      const position = j;
      const el2 = el.ans[j];

      if (position === 0) continue;
      await answerToQuestion(position, process.id, el2);
    }
  }
};

const createNewUser = async (login) => {
  const candidate = await prisma.user.findFirst({
    where: { login },
  });

  if (candidate) return candidate;
  else
    return await prisma.user.create({
      data: { login, password: 'qwerty', roleId: 2 },
    });
};

const createProcess = async (userId, date) => {
  const candidate = await prisma.testOneProcesses.findFirst({
    where: {
      userId,
    },
  });

  if (candidate) return candidate;
  else
    return await prisma.testOneProcesses.create({
      data: {
        startDate: date,
        endDate: date,
        complete: true,
        userId,
      },
    });
};

const answerToQuestion = async (position, processId, answer) => {
  const question = await prisma.testOneQuestions.findFirst({
    where: { position },
  });

  if (!question) return;

  const candidate = await prisma.testOneAnswer.findFirst({
    where: { processId, questionId: question.id },
  });

  if (candidate)
    await prisma.testOneAnswer.update({
      where: { id: candidate.id },
      data: {
        answer,
        processId,
        questionId: question.id,
      },
    });
  else
    await prisma.testOneAnswer.create({
      data: {
        answer,
        processId,
        questionId: question.id,
      },
    });
};
