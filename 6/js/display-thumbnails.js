import { createPhotoDescriptions } from './create-photo-descriptions.js';

const picturesList = document.querySelector('.pictures');

const photoThumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const thumbnailsListFragment = document.createDocumentFragment();

const descriptionsList = createPhotoDescriptions();

const createThumbnail = (item) => {
  const photoThumbnail = photoThumbnailTemplate.cloneNode(true);
  const imageTemplate = photoThumbnail.querySelector('.picture__img');

  imageTemplate.src = item['url'];
  imageTemplate.alt = item['description'];
  photoThumbnail.querySelector('.picture__likes').textContent = item['likes'];
  photoThumbnail.querySelector('.picture__comments').textContent = item['comments'].length;
  thumbnailsListFragment.append(photoThumbnail);
};

const displayThumbnails = () => {
  descriptionsList.forEach((item) => createThumbnail(item));
  picturesList.append(thumbnailsListFragment);
};

export {displayThumbnails};
