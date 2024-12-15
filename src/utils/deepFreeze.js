/**
 * 객체 속 객체가 중첩되어 있는 경우,
 * 내부 객체의 프로퍼티의 불변성을 보장해주기 위해
 * 재귀적으로 내부를 전부 동결해주어야 함
 * @param {Object} object 
 * @returns {Object}
 */
const deepFreeze = (object) => {
  Object.keys(object).forEach((key) => {
    if (
      typeof object[key] === 'object' 
      && object[key] !== null 
      && !Object.isFrozen(object[key])
    ) {
      deepFreeze(object[key]);
    }
  });

  return Object.freeze(object);
}

export default deepFreeze;
