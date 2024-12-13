import { ERROR_MESSAGES } from '../constants/constants.js';

const isNumber = (date) => {
  return !Number.isNaN(date);
}

const isInteger = (date) => {
  return Number.isInteger(date);
}

const isInRange = (date) => {
  return 1 <= date && date <= 31;
}

const validateDate = (date) => {
  if (!isNumber(date) || !isInteger(date) || !isInRange(date)) {
    throw new Error(ERROR_MESSAGES.INVALID_DATE);
  }
}

export default validateDate;
