const DESCRIPTIONS = [
  'Закат',
  'Осень',
  'Вечер',
  'Утро',
  'Завтрак',
  'Природа',
  'Работа',
  'Спорт',
  'Книги',
  'Планы',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Данил',
  'Алина',
  'Алексей',
  'Мария',
  'Константин',
  'Елена',
  'Сергей',
  'Дарья',
  'Александр',
  'Наталья'
];

const GENERATED_OBJECTS_COUNT = 25;
let lastId = 1;
const generateUniqueId = () => lastId++;

const getRandomInteger = (minimum, maximum) => {
  const LOWER = Math.ceil(Math.min(minimum, maximum));
  const UPPER = Math.floor(Math.max(minimum, maximum));
  const RESULT = Math.random() * (UPPER - LOWER + 1) + LOWER;
  return Math.floor(RESULT);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createRandomIdFromRangeGenerator = (min, max) => {
  const PREVIOUS_VALUES = [];

  return () => {
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
};

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
  id: createRandomIdFromRangeGenerator(1, 25),
  url: `photos/${getRandomInteger(1, 6)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: generateComments(),
});

function generatePhotos() {
  const PHOTO_OBJECTS = [];

  for (let i = 1; i <= GENERATED_OBJECTS_COUNT; i++) {
    PHOTO_OBJECTS.push(createPhotoObject());
  }

  return PHOTO_OBJECTS;
}

generatePhotos();
