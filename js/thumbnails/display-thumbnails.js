import { displayBigPicture } from './display-big-picture.js';

const thumbnailsListFragment = document.createDocumentFragment();
const picturesList = document.querySelector('.pictures');
const photoThumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = (description) => {
  const photoThumbnail = photoThumbnailTemplate.cloneNode(true);
  const imageTemplate = photoThumbnail.querySelector('.picture__img');

  imageTemplate.src = description.url;
  imageTemplate.alt = description.description;
  photoThumbnail.querySelector('.picture__likes').textContent = description.likes;
  photoThumbnail.querySelector('.picture__comments').textContent = description.comments.length;

  photoThumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    displayBigPicture(description);
  });

  return photoThumbnail;
};

const displayThumbnails = (data) => {
  data.forEach((item) => thumbnailsListFragment.append(createThumbnail(item)));
  picturesList.append(thumbnailsListFragment);

};

export { displayThumbnails };
