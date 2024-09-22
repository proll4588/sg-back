import pdf from 'pdf-parse';

const key_text = [
  {
    id: 1,
    text: 'Оценка информации и умение разбивать ее на компоненты.',
  },
  {
    id: 2,
    text: 'Определение сильных и слабых сторон того или иного явления.',
  },
  {
    id: 3,
    text: 'Определение понятий и оценка силы доказательств.',
  },
  {
    id: 4,
    text: 'Использование сильных, убедительных аргументов для доказательства своей позиции.',
  },
  {
    id: 5,
    text: 'Определение причины и следствия.',
  },
  {
    id: 6,
    text: 'Умение принимать решение рационально, без влияния эмоций и импульсов.',
  },
  {
    id: 7,
    text: 'Поиск стратегии и выбор оптимального решения.',
  },
  {
    id: 8,
    text: 'Поиск новых, нестандартных и часто неожиданных решений.',
  },
];

const findProc = (text, title) => {
  const addLength = title.length + 1;

  const index = text.indexOf(title) + addLength;

  let ans = '';
  for (let i = index; text[i] !== '%'; i++) {
    ans += text[i];
  }

  return Number(ans);
};

pdf('testTreeParsing/123.pdf').then(({ text }) => {
  key_text.forEach((el) => {
    const ans = findProc(text, el.text);
    console.log(el.text, '>>', ans);
  });
});
