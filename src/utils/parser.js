
const stringToNumber = (string) => {
  return Number(string);
}

const stringToArray = (string) => {
  return string.split(',').map((item) => item.trim());
}

const parser = {
  stringToNumber,
  stringToArray,

}

export default parser;
