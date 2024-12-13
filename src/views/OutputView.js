import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGES } from '../constants/constants.js';

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
   */
  printResult(date, menuObj) {
    Console.print(OUTPUT_MESSAGES.RESULT_START(date));
    this.printMenu(menuObj);
  },

  printMenu(menuObj) {
    Console.print('<주문 메뉴>');
    menuObj.forEach(({ menu, quantity }) => {
      Console.print(`${menu} ${quantity}개`);
    });
  },
}

export default OutputView;
