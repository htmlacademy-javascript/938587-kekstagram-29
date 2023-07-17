import { initScale, resetScale } from './scale.js';
import { initEffects, updateEffects } from './filters.js';
import { initValidator, pristineValidate, pristineReset } from './validate.js';

const uploadInput = document.querySelector('.img-upload__input');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const effectsList = document.querySelector('.img-upload__effects');
const currentEffect = effectsList.querySelector('input:checked').value;
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const onImageUploadCancelClick = () => {
  closeUploadForm();
};

const onDocumentKeydown = (event) => {
  if (event.key === 'Escape' && !(document.activeElement === textHashtags) && !(document.activeElement === textDescription)) {
    event.preventDefault();
    closeUploadForm();
  }
};

const onEffectsListChange = (event) => updateEffects(event.target.value);

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imageUploadCancel.addEventListener('click', onImageUploadCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUploadForm () {
  resetScale();
  uploadForm.reset();
  pristineReset();
  updateEffects(currentEffect);
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadCancel.removeEventListener('click', onImageUploadCancelClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onUploadInputChange = () => {
  openUploadForm();
};

const onUploadFormSubmit = (evt) => {
  if (!pristineValidate()) {
    evt.preventDefault();
  }
};

const initUploadForm = () => {
  initScale();
  initEffects(currentEffect);
  initValidator();
  effectsList.addEventListener('change', onEffectsListChange);
  uploadInput.addEventListener('change', onUploadInputChange);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
};

export { initUploadForm };
