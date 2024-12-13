import parser from '../utils/parser.js';
import validateMenu from '../validations/validateMenu.js';
import validateDate from '../validations/validateDate.js';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import EventManager from '../models/EventManager.js';
import getTotalPriceBeforeDiscount from '../utils/getTotalPriceBeforeDiscount.js';

class Controller {
  async start() {
    OutputView.printWelcome();
    const date = await this.#getValidatedDate();
    const menuObj = await this.#getValidatedMenu();

    const eventManager = new EventManager(date, menuObj);
    const totalPrice = getTotalPriceBeforeDiscount(menuObj);

    if (totalPrice >= 10_000) {
      eventManager.calculateDdayDiscount(date);
      eventManager.calculateWeekDiscount(date, menuObj);
    }

    OutputView.printResult(date, menuObj, totalPrice);
  }

  async #getValidatedDate() {
    try {
      const date = await InputView.readDate();
      const dateNum = parser.stringToNumber(date);
      validateDate(dateNum);

      return dateNum;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.#getValidatedDate();
    }
  }

  async #getValidatedMenu() {
    try {
      const menus = await InputView.readMenu();
      const menuArray = parser.stringToArray(menus);
      const parsedMenuArray = parser.deleteEmptyValue(menuArray);
      validateMenu(parsedMenuArray);

      // [ { menu: '티본스테이크', quantity: 1 }, ]
      return parser.splitMenuAndQuantity(menuArray);
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.#getValidatedMenu();
    }
  }
}

export default Controller;
