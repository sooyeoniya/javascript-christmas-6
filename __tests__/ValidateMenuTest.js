import { ERROR_MESSAGES } from '../src/constants/constants.js';
import parser from '../src/utils/parser.js';
import validateMenu from '../src/validations/validateMenu.js';

describe('validateMenu 메서드 테스트', () => {
  test.each([
    ['입력 값이 빈 경우', ''],
    ['입력 형식이 맞지 않은 경우 (1)', '티본스테이크-1-1'],
    ['입력 형식이 맞지 않은 경우 (2)', '티본-스테이크-1'],
    ['입력 형식이 맞지 않은 경우 (3)', '티본스테이크1-해산물파스타2'],
    ['입력 형식이 맞지 않은 경우 (4)', '티본스테이크-1-해산물파스타-2'],
    ['메뉴판에 없는 메뉴인 경우', '없는메뉴-1,티본스테이크-2'],
    ['수량이 숫자가 아닌 경우', '양송이수프-숫자아님'],
    ['수량이 1 이상이 아닌 경우', '양송이수프-0'],
    ['중복된 메뉴가 있는 경우', '티본스테이크-1,티본스테이크-2'],
    ['음료만 주문한 경우', '제로콜라-1,샴페인-2,레드와인-3'],
    ['전체 메뉴 개수가 20개를 초과하는 경우', '제로콜라-10,크리스마스파스타-12,시저샐러드-3'],
  ])('%s', (_, input) => {
    const parsedInput = parser.stringToArray(input);
    expect(() => {
      validateMenu(parsedInput);
    }).toThrow(ERROR_MESSAGES.INVALID_ORDER);
  });

  test.each([
    '아이스크림-1, 제로콜라-2', '양송이수프-3', '타파스-1,제로콜라-1', '해산물파스타-2,레드와인-1,초코케이크-1'
  ])('입력이 올바른 경우 에러가 발생하지 않는다.', (input) => {
    const parsedInput = parser.stringToArray(input);
    expect(() => {
      validateMenu(parsedInput);
    }).not.toThrow();
  });
});
