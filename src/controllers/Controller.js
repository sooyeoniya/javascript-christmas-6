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

    if (totalPrice >= 10_000) this.#manageEvent(eventManager, date, menuObj, totalPrice);

    OutputView.printResult(date, menuObj, totalPrice, eventManager.getEventList(totalPrice));
  }

  #manageEvent(eventManager, date, menuObj, totalPrice) {
    eventManager.calculateDdayDiscount(date); // 크리스마스 디데이 할인
    eventManager.calculateWeekDiscount(date, menuObj); // 평일, 주말 할인
    eventManager.calculateSpecialDiscount(date); // 특별 할인
    eventManager.calculateGiftsInfo(totalPrice); // 증정 이벤트
    eventManager.setEventBadge(); // 배지
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
      return parser.splitMenuAndQuantity(menuArray); // [ { menu: '티본스테이크', quantity: 1 }, ]
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.#getValidatedMenu();
    }
  }
}

export default Controller;
