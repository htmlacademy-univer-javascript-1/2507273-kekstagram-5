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

const previousValues = [];
export const createRandomIdFromRangeGenerator = (min, max) => () => {
  let currentValue = getRandomInteger(min, max);
  if (previousValues.length >= (max - min + 1)) {
    return null;
  }
  while (previousValues.includes(currentValue)) {
    currentValue = getRandomInteger(min, max);
  }
  previousValues.push(currentValue);
  return currentValue;
};
