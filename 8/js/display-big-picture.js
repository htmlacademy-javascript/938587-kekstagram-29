const COMMENTS_COUNTER = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img').querySelector('img');
const commentsList = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const closeButton = document.querySelector('.big-picture__cancel');
const moreButton = document.querySelector('.social__comments-loader');
const commentsCount = document.querySelector('.social__comment-count');

let comments;
let shownComments = 0;

const fillCommentsCounter = () => {
  commentsCount.innerHTML = `${shownComments} из <span class="comment-count">${comments.length}</span> комментариев`;
};

const setButtonState = () => {
  if (shownComments >= comments.length) {
    moreButton.classList.add('hidden');
    return;
  }
  moreButton.classList.remove('hidden');
};
const createComment = (item) => {
  const comment = socialComment.cloneNode(true);
  const avatar = comment.querySelector('.social__picture');
  avatar.src = item.avatar;
  avatar.alt = item.name;
  comment.querySelector('.social__text').textContent = item.message;
  return comment;
};

// Использую объявление функции через function для всплытия - для обработчика onShowMoreButtonClick
const renderCommentsList = () => {
  const fragment = document.createDocumentFragment();
  const currentComments = comments.slice(shownComments, shownComments + COMMENTS_COUNTER);
  shownComments = Math.min(shownComments + COMMENTS_COUNTER, comments.length);

  currentComments.forEach((comment) => fragment.append(createComment(comment)));
  commentsList.append(fragment);
  setButtonState();
  fillCommentsCounter();
};

const onShowMoreButtonClick = (event) => {
  event.preventDefault();
  renderCommentsList();
};

const showModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  moreButton.addEventListener('click', onShowMoreButtonClick);
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  moreButton.removeEventListener('click', onShowMoreButtonClick);
  shownComments = 0;
};

// Использую объявление функции через function для всплытия
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !evt.target.closest('.social__footer-text')) {
    evt.preventDefault();
    closeModal();
  }
}

// Использую объявление функции через function для всплытия
function onCloseButtonClick() {
  closeModal();
}

const fillBigPicture = (data) => {
  bigPictureImage.src = data.url;
  bigPictureImage.alt = data.description;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.social__caption').textContent = data.description;
  renderCommentsList();
};

const displayBigPicture = (data) => {
  commentsList.innerHTML = '';
  comments = data.comments;
  // hideElements();
  fillBigPicture(data);
  showModal();
};

export { displayBigPicture };
