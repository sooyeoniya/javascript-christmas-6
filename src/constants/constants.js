import deepFreeze from '../utils/deepFreeze.js';

export const MINIMUM_PRICE = 10_000;
export const WEEK_DISCOUNT = 2_023;
export const NONE = '없음';
export const WEEKEND_INDEX = Object.freeze([1, 2]);
export const SPECIAL_DAYS = Object.freeze([3, 10, 17, 24, 25, 31]);

export const TOTAL_DISCOUNT = Object.freeze({
  SANTA: 20_000,
  TREE: 10_000,
  STAR: 5_000,
});

export const BADGE = Object.freeze({
  [TOTAL_DISCOUNT.SANTA]: '산타',
  [TOTAL_DISCOUNT.TREE]: '트리',
  [TOTAL_DISCOUNT.STAR]: '별',
});

export const MENU_TYPE = Object.freeze({
  APPETIZER: 'appetizer',
  MAIN: 'main',
  DESSERT: 'dessert',
  DRINK: 'drink',
})

export const MENUS = deepFreeze([
  { type: MENU_TYPE.APPETIZER, name: '양송이수프', price: 6_000 },
  { type: MENU_TYPE.APPETIZER, name: '타파스', price: 5_500 },
  { type: MENU_TYPE.APPETIZER, name: '시저샐러드', price: 8_000 },
  { type: MENU_TYPE.MAIN, name: '티본스테이크', price: 55_000 },
  { type: MENU_TYPE.MAIN, name: '바비큐립', price: 54_000 },
  { type: MENU_TYPE.MAIN, name: '해산물파스타', price: 35_000 },
  { type: MENU_TYPE.MAIN, name: '크리스마스파스타', price: 25_000 },
  { type: MENU_TYPE.DESSERT, name: '초코케이크', price: 15_000 },
  { type: MENU_TYPE.DESSERT, name: '아이스크림', price: 5_000 },
  { type: MENU_TYPE.DRINK, name: '제로콜라', price: 3_000 },
  { type: MENU_TYPE.DRINK, name: '레드와인', price: 60_000 },
  { type: MENU_TYPE.DRINK, name: '샴페인', price: 25_000 },
]);

export const ERROR_MESSAGES = Object.freeze({
  INVALID_ORDER: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  INVALID_DATE: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
});

export const INPUT_MESSAGES = Object.freeze({
  DATE: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  MENU: '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

export const OUTPUT_MESSAGES = Object.freeze({
  WELCOME: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  RESULT_START: (date) => `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
});
