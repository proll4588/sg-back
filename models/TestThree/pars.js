import pdf from 'pdf-parse';
import { key_text } from './constants.js';

const findProc = (text, title) => {
  const addLength = title.length + 1;

  const index = text.indexOf(title) + addLength;

  let ans = '';
  for (let i = index; text[i] !== '%'; i++) {
    ans += text[i];
  }

  return Number(ans);
};

export const parsePdf = async (file) => {
  const { text } = await pdf(file);

  const ans = key_text.map((el) => {
    const ans = findProc(text, el.text);
    return {
      id: el.id,
      result: ans,
    };
  });

  return ans;
};
