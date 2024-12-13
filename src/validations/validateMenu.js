import { ERROR_MESSAGES, MENUS } from '../constants/constants.js';
import parser from '../utils/parser.js';

/**
 * [ '티본스테이크-1', '해산물파스타-3' ]
 * 입력 값이 빈 경우
 * @param {Array<string>} menuArray 
 */
const isEmpty = (menuArray) => {
  if (menuArray.length === 0) {
    throw new Error(ERROR_MESSAGES.INVALID_ORDER);
  }
}

/**
 * '티본스테이크-1'
 * 입력 형식이 안맞는 경우
 * @param {string} eachMenu 
 */
const isInvalidForm = (eachMenu) => {
  const menuAndQuantity = eachMenu.split('-');
  if (menuAndQuantity.length !== 2) {
    throw new Error(ERROR_MESSAGES.INVALID_ORDER);
  }
}

/**
 * '티본스테이크'
 * 메뉴판에 없는 메뉴인 경우
 * @param {string} menu 
 */
const isNoMenu = (menu) => {
  if (MENUS.every((menuInfo) => menuInfo.name !== menu)) {
    throw new Error(ERROR_MESSAGES.INVALID_ORDER);
  };
}

/**
 * 수량이 숫자가 아니거나 1 이상의 숫자가 아닌 경우
 * @param {number} quantity 
 */
const isInvalidQuantity = (quantity) => {
  if (Number.isNaN(quantity) || quantity < 1) {
    throw new Error(ERROR_MESSAGES.INVALID_ORDER);
  }
}

/**
 * [ '티본스테이크', '티본스테이크', ]
 * 입력에 중복된 메뉴가 있는 경우
 * @param {Array<string>} onlyMenusArray 
 */
const isDuplicateMenu = (onlyMenusArray) => {
  const onlyMenusSet = new Set(onlyMenusArray);
  if (onlyMenusArray.length !== onlyMenusSet.size) {
    throw new Error(ERROR_MESSAGES.INVALID_ORDER);
  }
}

/**
 * [ '티본스테이크', '티본스테이크', ]
 * 입력 메뉴들이 모두 음료만 주문한 경우인지 확인
 * @param {Array<string>} onlyMenusArray 
 */
const isOnlyDrink = (onlyMenusArray) => {
  const inputMenuInfo = MENUS.filter((menuInfo) => onlyMenusArray.includes(menuInfo.name));
  if (inputMenuInfo.every((menuInfo) => menuInfo.type === 'drink')) {
    throw new Error(ERROR_MESSAGES.INVALID_ORDER);
  }
}

/**
 * [ 1, 2, ]
 * 전체 메뉴 개수가 20개를 초과하는지 확인
 * @param {Array<number>} onlyQuantityArray 
 */
const isOverQuantity = (onlyQuantityArray) => {
  const sumQuantity = onlyQuantityArray.reduce((eachQuantity, sum) => sum + eachQuantity, 0);
  if (sumQuantity > 20) {
    throw new Error(ERROR_MESSAGES.INVALID_ORDER);
  }
}

/**
 * [ '티본스테이크-1', '해산물파스타-3' ]
 * @param {Array<string>} menuArray 
 */
const validateMenu = (menuArray) => {
  isEmpty(menuArray);
  menuArray.forEach((eachMenu) => isInvalidForm(eachMenu));

  const menuObj = parser.splitMenuAndQuantity(menuArray);
  menuObj.forEach(({ menu, quantity }) => {
    isNoMenu(menu);
    isInvalidQuantity(quantity);
  });

  const onlyMenusArray = menuObj.map(({menu}) => menu);
  isDuplicateMenu(onlyMenusArray);
  isOnlyDrink(onlyMenusArray);

  const onlyQuantityArray = menuObj.map(({quantity}) => quantity);
  isOverQuantity(onlyQuantityArray);
}

export default validateMenu;
