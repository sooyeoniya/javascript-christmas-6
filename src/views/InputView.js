import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGES } from '../constants/constants.js';

const InputView = {
  readDate() {
    try {
      return Console.readLineAsync(INPUT_MESSAGES.DATE);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  readMenu() {
    try {
      return Console.readLineAsync(INPUT_MESSAGES.MENU);
    } catch (error) {
      throw new Error(error.message);
    }
  },
}

export default InputView;
