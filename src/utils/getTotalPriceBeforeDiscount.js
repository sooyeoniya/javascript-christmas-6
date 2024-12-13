import { MENUS } from '../constants/constants.js';

/**
 * 할인 전 총주문 금액을 계산하여 반환한다.
 * [ { menu: '티본스테이크', quantity: 1 }, ]
 * @param {Array<{ menu: string, quantity: number }>} menuObj
 */
const getTotalPriceBeforeDiscount = (menuObj) => {
  const onlyMenuNameArray = menuObj.map(({menu}) => menu);
  const filteredMenus = MENUS.filter((menuInfo) => onlyMenuNameArray.includes(menuInfo.name));
  menuObj.forEach(({ menu, quantity }) => {
    filteredMenus.find((menuInfo) => menuInfo.name === menu).quantity = quantity;
  });

  let totalPrice = 0;
  filteredMenus.forEach(({price, quantity }) => totalPrice += price * quantity);
  return totalPrice;
}

export default getTotalPriceBeforeDiscount;
