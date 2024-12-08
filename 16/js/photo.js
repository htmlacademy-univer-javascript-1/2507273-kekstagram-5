import { DESCRIPTIONS, MESSAGES, NAMES, GENERATED_OBJECTS_COUNT } from './data.js';
import { getRandomInteger, getRandomArrayElement, generateUniqueId, createRandomIdFromRangeGenerator } from './util.js';

const generateComments = () => {
  const COMMENTS = [];
  const COMMENTS_QUANTITY = getRandomInteger(0, 30);

  for (let i = 0; i < COMMENTS_QUANTITY; i++) {
    const message = `${getRandomArrayElement(MESSAGES)}
      ${getRandomInteger(0, 1) ? ` ${getRandomArrayElement(MESSAGES)}` : ''}`;
    COMMENTS.push({
      id: generateUniqueId(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: message,
      name: getRandomArrayElement(NAMES),
    });
  }

  return COMMENTS;
};

const createPhotoObject = () => ({
  id: createRandomIdFromRangeGenerator(1, 25)(),
  url: `photos/${getRandomInteger(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: generateComments(),
});

export const generatePhotos = () => {
  const PHOTO_OBJECTS = [];
  for (let i = 1; i <= GENERATED_OBJECTS_COUNT; i++) {
    PHOTO_OBJECTS.push(createPhotoObject());
  }
  return PHOTO_OBJECTS;
};
