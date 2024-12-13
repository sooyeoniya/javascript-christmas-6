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
   */
  printResult(date) {
    Console.print(OUTPUT_MESSAGES.RESULT_START(date));
  },

  printMenu() {
    Console.print('<주문 메뉴>');
  },
}

export default OutputView;
