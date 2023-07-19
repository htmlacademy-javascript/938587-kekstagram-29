const MAX_HASHTAG_QUANTITY = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_MASK = /^#[a-zа-яё0-9]{1,19}$/i;

const INVALID_COMMENT_LENGTH_TEXT = 'Максимальная длина комментария - 140 символов';
const INVALID_HASHTAG_TEXT = 'Не валидный хэштэг. Хэштэги должны начинаться с #, не могут состоять только из решетки, после решётки должны состоять из букв и чисел и не могут содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. Максимальная длина одного хэш-тега 20 символов.';
const INVALID_HASHTAG_QUANTITY_TEXT = 'Максимальное количество хэштэгов - пять';
const HASHTAG_REPEAT_TEXT = 'Хэштэги не должны повторяться';

const imageUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const createHashtagsArray = (value) => value.trim().toLowerCase().split(' ');

const checkHashtagCorrectness = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = createHashtagsArray(value);
  return hashtags.every((element) => HASHTAG_MASK.test(element));
};

const checkHashtagQuantity = (value) => {
  const hashtags = createHashtagsArray(value);
  return hashtags.length <= MAX_HASHTAG_QUANTITY;
};

const checkHashtagRepeat = (value) => {
  const hashtags = createHashtagsArray(value);
  return hashtags.length === new Set(hashtags).size;
};

const checkDescriptionLength = (value) => value.length <= MAX_COMMENT_LENGTH;

const pristineValidate = () => pristine.validate();
const pristineReset = () => pristine.reset();

const initValidator = () => {
  pristine.addValidator(textDescription, checkDescriptionLength, INVALID_COMMENT_LENGTH_TEXT, 1, true);
  pristine.addValidator(textHashtags, checkHashtagCorrectness, INVALID_HASHTAG_TEXT, 1, true);
  pristine.addValidator(textHashtags, checkHashtagQuantity, INVALID_HASHTAG_QUANTITY_TEXT, 1, true);
  pristine.addValidator(textHashtags, checkHashtagRepeat, HASHTAG_REPEAT_TEXT, 1, true);
};

export { initValidator, pristineValidate, pristineReset };
