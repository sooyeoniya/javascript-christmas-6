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
   * @param {{ giftMenu: string, quantity: number }} gifts
   */
  printResult(date, menuObj, totalPrice, gifts) {
    Console.print(OUTPUT_MESSAGES.RESULT_START(date));
    this.printMenu(menuObj);
    this.printTotalPriceBeforeDiscount(totalPrice);
    this.printGift(gifts);
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
    let giftString = '없음';
    if (gifts) giftString = `${gifts.giftMenu} ${gifts.quantity}개`;
    Console.print(giftString);
  },


//   <증정 메뉴>
// 없음
 
// <혜택 내역>
// 없음
 
// <총혜택 금액>
// 0원
 
// <할인 후 예상 결제 금액>
// 8,500원
 
// <12월 이벤트 배지>
// 없음
}

export default OutputView;
