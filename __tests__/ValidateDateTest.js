import { ERROR_MESSAGES } from '../src/constants/constants.js';
import parser from '../src/utils/parser.js';
import validateDate from '../src/validations/validateDate.js';

describe('validateDate 메서드 테스트', () => {
  test.each([
    ['숫자가 아닌 경우', 'a'],
    ['정수가 아닌 경우', '1.1'],
    ['범위가 올바르지 않은 경우: 1 미만', '0'],
    ['범위가 올바르지 않은 경우: 31 초과', '32'],
  ])('%s', (_, input) => {
    const parsedInput = parser.stringToNumber(input);
    expect(() => {
      validateDate(parsedInput);
    }).toThrow(ERROR_MESSAGES.INVALID_DATE);
  });

  test.each([
    '1', '5', '25', '31'
  ])('입력이 올바른 경우 에러가 발생하지 않는다.', (input) => {
    const parsedInput = parser.stringToNumber(input);
    expect(() => {
      validateDate(parsedInput);
    }).not.toThrow();
  });
});
