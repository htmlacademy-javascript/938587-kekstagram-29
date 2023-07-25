let message;
let isOpen = false;

const createElement = (template) => {
  const element = document.createElement('div');
  element.innerHTML = template;
  return element.firstChild;
};

const createMessage = (text, state, buttonText) => (
  `<section class="${state}">
    <div class="${state}__inner">
      <h2 class="${state}__title">${text}</h2>
      ${buttonText ? `<button type="button" class="${state}__button">${buttonText}</button>` : ''}
    </div>
  </section>`
);

const onDocumentKeydown = (event) => {
  if (event.key === 'Escape') {
    event.stopPropagation();
    event.preventDefault();
    closeMessage();
  }
};

const onCloseButtonClick = () => {
  closeMessage();
};

function closeMessage () {
  message.remove();
  document.removeEventListener('keydown', onDocumentKeydown);

  if (!isOpen) {
    document.body.classList.remove('modal-open');
  }
}

const showMessage = (text, state, buttonText) => {
  isOpen = false;
  message = createElement(createMessage(text, state, buttonText));
  document.body.append(message);

  message.addEventListener('click', (event) => {
    if (!event.target.closest(`.${state}__inner`)) {
      event.preventDefault();
      closeMessage();
    }
  });

  if (buttonText) {
    message.querySelector(`.${state}__button`).addEventListener('click', onCloseButtonClick);
  }

  document.addEventListener('keydown', onDocumentKeydown);

  if (!document.body.classList.contains('modal-open')) {
    document.body.classList.add('modal-open');
    return;
  }

  isOpen = true;
};

export {showMessage};
