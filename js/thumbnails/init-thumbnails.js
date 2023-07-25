import { displayThumbnails } from './display-thumbnails.js';
import { getData } from '../utils/api.js';
import { initFilters } from './filters.js';
import { showMessage } from '../upload-form/messages-template.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';
const ERROR_MESSAGE = 'Ошибка загрузки. Попробуйте позже';
const ERROR_CLASS_NAME = 'error';

const onGetSuccess = (data) => {
  initFilters(data);
  displayThumbnails(data);
};

const onGetError = () => {
  showMessage(ERROR_MESSAGE, ERROR_CLASS_NAME);
};

const initThumbnails = () => getData(DATA_URL, onGetSuccess, onGetError);

export { initThumbnails };
