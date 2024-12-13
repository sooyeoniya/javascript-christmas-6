export const WEEKEND_INDEX = Object.freeze([1, 2]);
export const SPECIAL_DAYS = Object.freeze([3, 10, 17, 24, 25, 31]);

export const MENUS = Object.freeze([
  { type: 'appetizer', name: '양송이수프', price: 6_000 },
  { type: 'appetizer', name: '타파스', price: 5_500 },
  { type: 'appetizer', name: '시저샐러드', price: 8_000 },
  { type: 'main', name: '티본스테이크', price: 55_000 },
  { type: 'main', name: '바비큐립', price: 54_000 },
  { type: 'main', name: '해산물파스타', price: 35_000 },
  { type: 'main', name: '크리스마스파스타', price: 25_000 },
  { type: 'dessert', name: '초코케이크', price: 15_000 },
  { type: 'dessert', name: '아이스크림', price: 5_000 },
  { type: 'drink', name: '제로콜라', price: 3_000 },
  { type: 'drink', name: '레드와인', price: 60_000 },
  { type: 'drink', name: '샴페인', price: 25_000 },
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
