import { MENUS } from '../constants/constants.js';

class EventManager {
  /** @type {number} 크리스마스 디데이 할인 */ #ddayDiscount = 0;
  /** @type {number} 평일 할인 */ #weekdayDiscount = 0;
  /** @type {number} 주말 할인 */ #weekendDiscount = 0;
  /** @type {number} 특별 할인 */ #specialDiscount = 0;
  /** @type {{ giftMenu: string, quantity: number }} 증정 이벤트 */ #gifts;
  /** @type {string} 배지 이름 */ #badge = '';

  constructor (date, menuObj) {
    
  }


}

export default EventManager;
