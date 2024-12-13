import { BADGE, NONE, TOTAL_DISCOUNT } from '../src/constants/constants.js';
import EventManager from '../src/models/EventManager.js';
import getTotalPriceBeforeDiscount from '../src/utils/getTotalPriceBeforeDiscount.js';

describe('EventManager 클래스 테스트', () => {
  // given
  const menuObj = [
    { menu: '티본스테이크', quantity: 1 },
    { menu: '바비큐립', quantity: 1 },
    { menu: '초코케이크', quantity: 2 },
    { menu: '제로콜라', quantity: 1 },
  ];
  const totalPrice = getTotalPriceBeforeDiscount(menuObj);

  test.each([
    [ '1일인 경우 1,000원 할인', 1, 1_000 ],
    [ '25일인 경우 3,400원 할인', 25, 3_400 ],
    [ '크리스마스 할인 이벤트 기간이 아닌 경우 0원', 26, 0 ],
  ])('calculateDdayDiscount 메서드 테스트: %s', (_, date, expectedDdayDiscount) => {
    // given
    const eventManager = new EventManager(date, menuObj);

    // when
    eventManager.calculateDdayDiscount(date);

    // then
    expect(eventManager.getEventList(totalPrice).dday).toBe(expectedDdayDiscount);
  });

  test.each([
    [ '주말인 경우 메인 메뉴 1 개당 2,023원 할인', 1, 0, 4_046 ], // 티본스테이크 1개, 바비큐립 1개
    [ '평일인 경우 디저트 메뉴 1 개당 2,023원 할인', 5, 4_046, 0 ], // 초코케이크 2개
  ])('calculateWeekDiscount 메서드 테스트: %s', (_, date, expectedWeekdayDiscount, expectedWeekendDiscount) => {
    // given
    const eventManager = new EventManager(date, menuObj);

    // when
    eventManager.calculateWeekDiscount(date, menuObj);

    // then
    expect(eventManager.getEventList(totalPrice).weekday).toBe(expectedWeekdayDiscount);
    expect(eventManager.getEventList(totalPrice).weekend).toBe(expectedWeekendDiscount);
  });

  test.each([
    [ '이벤트 달력에 별이 있는 경우 1,000원 특별 할인', 3, 1_000 ],
    [ '이벤트 달력에 별이 없는 경우 0원 특별 할인', 26, 0 ],
  ])('calculateSpecialDiscount 메서드 테스트: %s', (_, date, expectedSpecialDiscount) => {
    // given
    const eventManager = new EventManager(date, menuObj);

    // when
    eventManager.calculateSpecialDiscount(date);

    // then
    expect(eventManager.getEventList(totalPrice).special).toBe(expectedSpecialDiscount);
  });

  test.each([
    [ 
      '할인 전 총주문 금액이 12만원 이상인 경우', 
      3,
      [
        { menu: '티본스테이크', quantity: 1 },
        { menu: '바비큐립', quantity: 1 },
        { menu: '초코케이크', quantity: 2 },
        { menu: '레드와인', quantity: 2 },
      ],
      { giftMenu: '샴페인', quantity: 1 }, 
      25_000,
    ],
    [ 
      '할인 전 총주문 금액이 12만원 미만인 경우', 
      26,
      [
        { menu: '티본스테이크', quantity: 1 },
        { menu: '바비큐립', quantity: 1 },
      ],
      undefined, 
      0,
    ],
  ])('calculateGiftsInfo 메서드 테스트: %s', (_, date, menus, expectedGiftsInfo, expectedGiftsPrice) => {
    // given
    const mockTotalPrice = getTotalPriceBeforeDiscount(menus);
    const eventManager = new EventManager(date, menus);

    // when
    eventManager.calculateGiftsInfo(mockTotalPrice);

    // then
    expect(eventManager.getGiftsPrice()).toBe(expectedGiftsPrice);
    expect(eventManager.getEventList(mockTotalPrice).gifts).toEqual(expectedGiftsInfo);
  });

  test.each([
    ['총혜택 금액이 2만원 이상인 경우', 21_000, BADGE[TOTAL_DISCOUNT.SANTA]],
    ['총혜택 금액이 1만원 이상인 경우', 11_000, BADGE[TOTAL_DISCOUNT.TREE]],
    ['총혜택 금액이 5천원 이상인 경우', 5_000, BADGE[TOTAL_DISCOUNT.STAR]],
    ['총혜택 금액이 5천원 미만인 경우', 4_000, NONE],
  ])('setEventBadge 메서드 테스트: %s', (_, totalDiscount, expectedBadge) => {
    // given    
    const eventManager = new EventManager(1, menuObj);
    // getTotalDiscount 함수 반환 값 모킹
    jest.spyOn(eventManager, 'getTotalDiscount').mockReturnValue(totalDiscount);

    // when
    eventManager.setEventBadge();

    // then
    expect(eventManager.getEventList(totalPrice).badge).toEqual(expectedBadge);
  });
});
