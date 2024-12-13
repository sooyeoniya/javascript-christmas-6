import { MENUS, WEEKEND_INDEX } from '../constants/constants.js';

class EventManager {
  /** @type {number} 크리스마스 디데이 할인 */ #ddayDiscount = 0;
  /** @type {number} 평일 할인 */ #weekdayDiscount = 0;
  /** @type {number} 주말 할인 */ #weekendDiscount = 0;
  /** @type {number} 특별 할인 */ #specialDiscount = 0;
  /** @type {{ giftMenu: string, quantity: number }} 증정 이벤트 */ #gifts;
  /** @type {string} 배지 이름 */ #badge;

  /**
   * 크리스마스 디데이 할인: 1,000원으로 시작하여 크리스마스가 다가올수록 날마다 할인 금액이 100원씩 증가
   * @param {number} date 
   */
  calculateDdayDiscount(date) {
    if (date >= 1 && date <= 25) {
      this.#ddayDiscount = 1_000 + 100 * (date - 1);
    }
  }

  /**
   * 평일인지 주말인지 확인
   * @param {number} date 
   * @param {Array<{ menu: string, quantity: number }>} menuObj 
   */
  calculateWeekDiscount(date, menuObj) {
    const dateIndex = date % 7;
    if (WEEKEND_INDEX.includes(dateIndex)) {
      this.#calculateWeekendDiscount(menuObj);
      return;
    }
    this.#calculateWeekdayDiscount(menuObj);
  }

  /**
   * 주말 할인(금요일, 토요일): 주말에는 메인 메뉴를 메뉴 1개당 2,023원 할인
   * @param {Array<{ menu: string, quantity: number }>} menuObj 
   */
  #calculateWeekendDiscount(menuObj) {
    const onlyMenuNameArray = menuObj.map(({menu}) => menu);
    const filteredMenus = MENUS.filter((menuInfo) => {
      return onlyMenuNameArray.includes(menuInfo.name) && menuInfo.type === 'main'
    });
    if (filteredMenus) filteredMenus.forEach(({ quantity }) => this.#weekendDiscount += quantity * 2_023);
  }

  /**
   * 평일 할인 (일요일~목요일): 평일에는 디저트 메뉴를 메뉴 1개당 2,023원 할인
   * @param {Array<{ menu: string, quantity: number }>} menuObj 
   */
  #calculateWeekdayDiscount(menuObj) {
    const onlyMenuNameArray = menuObj.map(({menu}) => menu);
    const filteredMenus = MENUS.filter((menuInfo) => {
      return onlyMenuNameArray.includes(menuInfo.name) && menuInfo.type === 'dessert'
    });
    if (filteredMenus) filteredMenus.forEach(({ quantity }) => this.#weekdayDiscount += quantity * 2_023);
  }
}

export default EventManager;
