export const getRandomInteger = (minimum, maximum) => {
  const LOWER = Math.ceil(Math.min(minimum, maximum));
  const UPPER = Math.floor(Math.max(minimum, maximum));
  const RESULT = Math.random() * (UPPER - LOWER + 1) + LOWER;
  return Math.floor(RESULT);
};

export const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

let lastId = 1;
export const generateUniqueId = () => lastId++;

const PREVIOUS_VALUES = [];
export const createRandomIdFromRangeGenerator = (min, max) => () => {
  let currentValue = getRandomInteger(min, max);
  if (PREVIOUS_VALUES.length >= (max - min + 1)) {
    return null;
  }
  while (PREVIOUS_VALUES.includes(currentValue)) {
    currentValue = getRandomInteger(min, max);
  }
  PREVIOUS_VALUES.push(currentValue);
  return currentValue;
};
