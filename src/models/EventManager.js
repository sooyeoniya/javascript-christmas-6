import { MENUS, WEEKEND_INDEX, SPECIAL_DAYS, NONE, WEEK_DISCOUNT } from '../constants/constants.js';

class EventManager {
  /** @type {number} 크리스마스 디데이 할인 */ #ddayDiscount = 0;
  /** @type {number} 평일 할인 */ #weekdayDiscount = 0;
  /** @type {number} 주말 할인 */ #weekendDiscount = 0;
  /** @type {number} 특별 할인 */ #specialDiscount = 0;
  /** @type {{ giftMenu: string, quantity: number }} 증정 메뉴 정보 */ #gifts;
  /** @type {string} 배지 이름 */ #badge = NONE;

  getEventList(totalPrice) {
    return {
      dday: this.#ddayDiscount,
      weekday: this.#weekdayDiscount,
      weekend: this.#weekendDiscount,
      special: this.#specialDiscount,
      gifts: this.#gifts,
      badge: this.#badge,
      giftPrice: this.getGiftsPrice(),
      totalDiscount: this.getTotalDiscount(),
      totalPaymentAmount: totalPrice - this.getTotalDiscountExceptionGiftsPrice(),
    }
  }

  /**
   * 총 혜택 금액을 반환한다.
   * 총혜택 금액 = 할인 금액의 합계 + 증정 메뉴의 가격
   * @returns {number}
   */
  getTotalDiscount() {
    return this.#ddayDiscount + this.#weekdayDiscount + this.#weekendDiscount + this.#specialDiscount + this.getGiftsPrice();
  }

  /**
   * 증정 상품 가격을 제외한 나머지 총 혜택 금액을 반환한다.
   * 증정 삼품 가격 제외한 나머지 총 혜택 금액 = 총혜택 금액 - 증정 메뉴의 가격
   * @returns {number}
   */
  getTotalDiscountExceptionGiftsPrice() {
    return this.getTotalDiscount() - this.getGiftsPrice();
  }

  /**
   * 증정 상품의 총 금액을 반환한다.
   * @returns {number}
   */
  getGiftsPrice() {
    if (this.#gifts) {
      const price = MENUS.find((menuInfo) => this.#gifts.giftMenu === menuInfo.name).price;
      return this.#gifts.quantity * price;
    }
    return 0;
  }

  /**
   * 크리스마스 디데이 할인: 1,000원으로 시작하여 크리스마스가 다가올수록 날마다 할인 금액이 100원씩 증가
   * @param {number} date 
   */
  calculateDdayDiscount(date) {
    const minimumDay = 1;
    const maximumDay = 25;
    const defaultPrice = 1_000;
    const incrementalPrice = 100;
    if (date >= minimumDay && date <= maximumDay) {
      this.#ddayDiscount = defaultPrice + incrementalPrice * (date - 1);
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
   * 특별 할인: 이벤트 달력에 별이 있으면 총주문 금액에서 1,000원 할인
   * @param {number} date 
   */
  calculateSpecialDiscount(date) {
    if (SPECIAL_DAYS.includes(date)) {
      this.#specialDiscount = 1_000;
    }
  }

  /**
   * 증정 이벤트: 할인 전 총주문 금액이 12만 원 이상일 때, 샴페인 1개 증정
   * @param {number} totalPrice 
   */
  calculateGiftsInfo(totalPrice) {
    const maximumPrice = 120_000;
    if (totalPrice >= maximumPrice) {
      this.#gifts = { giftMenu: '샴페인', quantity: 1 };
    }
  }

  /**
   * 총혜택 금액에 따라 다른 이벤트 배지를 부여한다.
   * 5천 원 이상: 별
   * 1만 원 이상: 트리
   * 2만 원 이상: 산타
   */
  setEventBadge() {
    const totalDiscount = this.getTotalDiscount();
    if (totalDiscount >= 20_000) {
      this.#badge = '산타';
    } else if (totalDiscount >= 10_000) {
      this.#badge = '트리';
    } else if (totalDiscount >= 5_000) {
      this.#badge = '별';
    }
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
    if (filteredMenus) filteredMenus.forEach(({ quantity }) => this.#weekendDiscount += quantity * WEEK_DISCOUNT);
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
    if (filteredMenus) filteredMenus.forEach(({ quantity }) => this.#weekdayDiscount += quantity * WEEK_DISCOUNT);
  }
}

export default EventManager;
