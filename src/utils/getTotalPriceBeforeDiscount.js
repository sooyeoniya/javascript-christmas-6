import { MENUS } from '../constants/constants.js';

/**
 * 할인 전 총주문 금액을 계산하여 반환한다.
 * [ { menu: '티본스테이크', quantity: 1 }, ]
 * @param {Array<{ menu: string, quantity: number }>} menuObj
 */
const getTotalPriceBeforeDiscount = (menuObj) => {
  const onlyMenuNameArray = menuObj.map(({menu}) => menu);
  // 사용자가 입력한 메뉴들만 메뉴 정보 필터링하여 저장
  // const filteredMenus = MENUS.filter((menuInfo) => onlyMenuNameArray.includes(menuInfo.name));
  // 새 배열 만들어주는데, 현재 필터링된 메뉴 정보들에서 이름 정보가 같은 것에 quantity 추가
  const newMenusInfo = MENUS.map((menuInfo) => {
    // find 하여 해당하는 이름에 대한 quantity 정보 가져오기
    const findQuantity = menuObj.find(({ menu }) => menu === menuInfo.name)?.quantity;
    if (findQuantity) {
      return {
        ...menuInfo,
        quantity: findQuantity,
      }
    }
    return { 
      ...menuInfo,
      quantity: 0,
    }
  });

  let totalPrice = 0;
  newMenusInfo.forEach(({ price, quantity }) => totalPrice += price * quantity);
  return totalPrice;
}

export default getTotalPriceBeforeDiscount;
