import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGES } from '../constants/constants.js';
import parser from '../utils/parser.js';

const OutputView = {
  /**
   * 에러 메시지를 출력한다.
   * @param {string} errorMessage 
   */
  printErrorMessage(errorMessage) {
    Console.print(errorMessage);
  },

  /**
   * 환영 인사 출력한다.
   */
  printWelcome() {
    Console.print(OUTPUT_MESSAGES.WELCOME);
  },

  /**
   * 전체 결과를 출력한다.
   * [ { menu: '티본스테이크', quantity: 1 }, ]
   * @param {number} date
   * @param {Array<{ menu: string, quantity: number }>} menuObj
   * @param eventList
   */
  printResult(date, menuObj, totalPrice, eventList) {
    Console.print(OUTPUT_MESSAGES.RESULT_START(date));
    this.printMenu(menuObj);
    this.printTotalPriceBeforeDiscount(totalPrice);
    this.printGift(eventList.gifts);
    this.printDiscount(eventList);
    this.printTotalDiscount(eventList.totalDiscount);
    this.printTotalPaymentAmount(eventList.totalPaymentAmount);
    this.printBadge(eventList.badge);
  },

  printMenu(menuObj) {
    Console.print('<주문 메뉴>');
    menuObj.forEach(({ menu, quantity }) => {
      Console.print(`${menu} ${quantity}개`);
    });
  },

  printTotalPriceBeforeDiscount(totalPrice) {
    Console.print('\n<할인 전 총주문 금액>');
    Console.print(`${parser.numberToPrice(totalPrice)}원`);
  },

  /**
   * 증정 메뉴 출력
   * @param {{ giftMenu: string, quantity: number }} gifts
  */
  printGift(gifts) {
    Console.print('\n<증정 메뉴>');
    let giftString = '없음';
    if (gifts) giftString = `${gifts.giftMenu} ${gifts.quantity}개`;
    Console.print(giftString);
  },

  printDiscount({ dday, weekday, weekend, special, giftPrice }) {
    Console.print('\n<혜택 내역>');
    if (dday === 0 && weekday === 0 && weekend === 0 && special === 0 && giftPrice === 0) {
      Console.print('없음');
      return;
    }
    if (dday !== 0) Console.print(`크리스마스 디데이 할인: -${parser.numberToPrice(dday)}원`);
    if (weekday !== 0) Console.print(`평일 할인: -${parser.numberToPrice(weekday)}원`);
    if (weekend !== 0) Console.print(`주말 할인: -${parser.numberToPrice(weekend)}원`);
    if (special !== 0) Console.print(`특별 할인: -${parser.numberToPrice(special)}원`);
    if (giftPrice !== 0) Console.print(`증정 이벤트: -${parser.numberToPrice(giftPrice)}원`);
  },

  printTotalDiscount(totalDiscount) {
    Console.print('\n<총혜택 금액>');
    Console.print(`-${parser.numberToPrice(totalDiscount)}원`);
  },

  printTotalPaymentAmount(totalPaymentAmount) {
    Console.print('\n<할인 후 예상 결제 금액>');
    Console.print(`${parser.numberToPrice(totalPaymentAmount)}원`);
  },

  printBadge(badge) {
    Console.print('\n<12월 이벤트 배지>');
    Console.print(`${badge}`);
  },
}

export default OutputView;
