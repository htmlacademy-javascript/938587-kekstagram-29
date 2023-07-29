import { displayThumbnails } from './display-thumbnails.js';
import { debounce } from '../utils/util.js';

const RANDOM_PICTURES_COUNT = 10;
const DELAY = 500;
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';

const imageFilters = document.querySelector('.img-filters');
const imageFiltersForm = document.querySelector('.img-filters__form');
const picturesList = document.querySelector('.pictures');

const sortByCommentsLength = (data) => data.slice().sort((a, b) => b.comments.length - a.comments.length);

const sortRandom = (data) => {
  const dataClone = data.slice();

  for (let i = dataClone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dataClone[i], dataClone[j]] = [dataClone[j], dataClone[i]];
  }

  return dataClone.slice(0, RANDOM_PICTURES_COUNT);
};

const getFilteredData = (id, data) => {
  switch (id) {
    case FILTER_RANDOM:
      return sortRandom(data);
    case FILTER_DISCUSSED:
      return sortByCommentsLength(data);
    default:
      return data;
  }
};

const renderFilteredPictures = (id, data) => {
  picturesList.querySelectorAll('.picture').forEach((picture) => picture.remove());
  displayThumbnails(getFilteredData(id, data));
};

const renderPictures = debounce((id, data) => renderFilteredPictures(id, data), DELAY);

const initFilters = (data) => {
  imageFilters.classList.remove('img-filters--inactive');

  imageFiltersForm.addEventListener('click', (event) => {
    if (event.target.closest('.img-filters__button') && !event.target.closest('.img-filters__button--active')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      event.target.classList.add('img-filters__button--active');
      renderPictures(event.target.id, data);
    }
  });
};

export { initFilters, getFilteredData };
