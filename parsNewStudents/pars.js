import { prisma } from '../controllers/prisma.controller.js';
import csv from 'csv-parser';
import fs from 'fs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru.js';

dayjs.locale('ru');

const results = [];

fs.createReadStream('parsNewStudents/data.csv')
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

const start = () => {
  // Групировка
  const groupedData = {};

  results.forEach((el) => {
    const has = !!groupedData[el['ЗачетнаяКнига']];
    if (has) groupedData[el['ЗачетнаяКнига']].push(el);
    else groupedData[el['ЗачетнаяКнига']] = [el];
  });
  //

  // Сортировка и выборка
  const extractDate = (str) => {
    const splt = str.split(' ');
    const date = `${splt[3]} ${splt[4]}`;

    console.log(date);

    return dayjs(date, 'DD.MM.YYYY HH:mm:ss');
    // return new Date(date);
  };

  const sortedData = [];
  for (const key in groupedData) {
    const el = groupedData[key];
    const newData = el.map((el1) => ({
      ...el1,
      date: extractDate(el1['Регистратор']),
    }));

    console.log('newData >> ', newData);
  }
  //

  //   console.log('sortedData >> ', groupedData);
};
