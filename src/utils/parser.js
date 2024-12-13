
const stringToNumber = (string) => {
  return Number(string);
}

const stringToArray = (string) => {
  return string.split(',').map((item) => item.trim());
}

const deleteEmptyValue = (array) => {
  return array.filter((item) => item !== '');
}

const numberToPrice = (number) => {
  return number.toLocaleString('ko-KR');
}

/**
 * [ '티본스테이크-1', '해산물파스타-3' ]
 * [ { menu: '티본스테이크', quantity: 1 }, ]
 * @param {Array<string>} menuArray 
 * @returns {Array<{ menu: string, quantity: number }>}
 */
const splitMenuAndQuantity = (menuArray) => {
  return menuArray.map((item) => {
    const menuAndQuantity = item.split('-');
    return { 
      menu: menuAndQuantity[0].trim(), 
      quantity: stringToNumber(menuAndQuantity[1].trim())
    };
  })
}

const parser = {
  stringToNumber,
  stringToArray,
  deleteEmptyValue,
  splitMenuAndQuantity,
  numberToPrice,
}

export default parser;
