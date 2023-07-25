import { initScale, resetScale } from './scale.js';
import { initSlider } from './effects.js';
import { initValidator, validatePristine, resetPristine } from './validate.js';
import { sendData } from '../utils/api.js';
import { showMessage } from './messages-template.js';

const UPLOAD_URL = 'https://29.javascript.pages.academy/kekstagram';
const SUCCESS_MESSAGE = 'Изображение успешно загружено';
const SUCCESS_BUTTON_MESSAGE = 'Отлично!';
const SUCCESS_CLASS_NAME = 'success';
const ERROR_MESSAGE = 'Ошибка загрузки изображения';
const ERROR_BUTTON_MESSAGE = 'Попробовать снова';
const ERROR_CLASS_NAME = 'error';

const uploadInput = document.querySelector('.img-upload__input');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const effectsList = document.querySelector('.img-upload__effects');
const currentEffect = effectsList.querySelector('input:checked').value;
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadSubmit = document.querySelector('.img-upload__submit');

const onImageUploadCancelClick = () => {
  closeUploadForm();
};

const onDocumentKeydown = (event) => {
  if (event.key === 'Escape' && !(document.activeElement === textHashtags) && !(document.activeElement === textDescription)) {
    event.preventDefault();
    closeUploadForm();
  }
};

const onEffectsListChange = (event) => initSlider(event.target.value);

function openUploadForm () {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imageUploadCancel.addEventListener('click', onImageUploadCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadForm () {
  resetScale();
  uploadForm.reset();
  resetPristine();
  initSlider(currentEffect);
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadCancel.removeEventListener('click', onImageUploadCancelClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onUploadInputChange = () => {
  openUploadForm();
};

const setButtonState = (state) => {
  imgUploadSubmit.disabled = state;
};

const uploadSuccess = () => {
  setButtonState(false);
  closeUploadForm();
  showMessage(SUCCESS_MESSAGE, SUCCESS_CLASS_NAME, SUCCESS_BUTTON_MESSAGE);
};

const uploadError = () => {
  setButtonState(false);
  showMessage(ERROR_MESSAGE, ERROR_CLASS_NAME, ERROR_BUTTON_MESSAGE);
};

const onUploadFormSubmit = (event) => {
  event.preventDefault();

  if (validatePristine()) {
    setButtonState(true);
    const formData = new FormData(event.target);
    sendData(UPLOAD_URL, formData, uploadSuccess, uploadError);
  }
};

const initUploadForm = () => {
  initScale();
  initSlider(currentEffect);
  initValidator();
  effectsList.addEventListener('change', onEffectsListChange);
  uploadInput.addEventListener('change', onUploadInputChange);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
};

export { initUploadForm };
