import { getRandomInteger, getRandomArrayElement } from '../utils/util.js';

const PHOTO_DESCRIPTIONS_COUNT = 25;

let photoId = 1;
let commentId = 1;

const AVATAR_COUNTER = {
  min: 1,
  max: 6
};

const LIKES_COUNTER = {
  min: 15,
  max: 200
};

const COMMENTS_COUNTER = {
  min: 1,
  max: 30
};

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Виктория Харитонова',
  'Вера Казакова',
  'Лев Дьяков',
  'Есения Игнатьева',
  'София Григорьева',
  'Полина Михайлова',
  'Елизавета Миронова',
  'Леонид Зайцев',
  'Арина Петрова',
  'Елизавета Полякова',
];

const DESCRIPTIONS = [
  'Stop looking for happiness in the same place you just lost it.',
  'Good things come to those who book flights.',
  'We go together like peanut butter and jelly.',
  'A lot goes down when we dress up.',
  'Friends become our chosen family!',
  'Tis the season to be freezin’'
];

const createSingleComment = () => {
  const message = Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(MESSAGES));
  return Array.from(new Set(message)).join(' ');
};

const createCommentsArray = () => ({
  id: commentId++,
  avatar:  `img/avatar-${getRandomInteger(AVATAR_COUNTER.min, AVATAR_COUNTER.max)}.svg`,
  message: createSingleComment(),
  name: getRandomArrayElement(NAMES),
});

const createDescription = () => ({
  id: photoId,
  url: `photos/${photoId++}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_COUNTER.min, LIKES_COUNTER.max),
  comments: Array.from({length: getRandomInteger(COMMENTS_COUNTER.min, COMMENTS_COUNTER.max)}, createCommentsArray)
});

const createPhotoDescriptions = () => Array.from({length: PHOTO_DESCRIPTIONS_COUNT}, createDescription);

export { createPhotoDescriptions };
