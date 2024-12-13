import { ERROR_MESSAGES } from '../constants/constants.js';

const isNumber = (date) => {
  return !Number.isNaN(date);
}

const isInteger = (date) => {
  return Number.isInteger(date);
}

const isInRange = (date) => {
  const minimumDate = 1;
  const maximumDate = 31;
  return minimumDate <= date && date <= maximumDate;
}

const validateDate = (date) => {
  if (!isNumber(date) || !isInteger(date) || !isInRange(date)) {
    throw new Error(ERROR_MESSAGES.INVALID_DATE);
  }
}

export default validateDate;
