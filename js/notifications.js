import {isEscapeKey} from './util.js';

const bodyElement = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeNotification();
  }
};

const onDocumentClick = () => {
  closeNotification();
};

function closeNotification() {
  const notification = document.querySelector('.notification-shown');
  if (notification) {
    notification.remove();
    document.removeEventListener('keydown', onDocumentEscKeydown);
    document.removeEventListener('click', onDocumentClick);
  }
}

const showNotification = (template) => {
  const notification = template.cloneNode(true);
  notification.classList.add('notification-shown');

  const closeErrorButton = notification.querySelector('.error__button');
  if (closeErrorButton) {
    closeErrorButton.addEventListener('click', closeNotification);
  }

  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);

  bodyElement.insertAdjacentElement('beforeend', notification);
};

const showSuccessSubmitNotification = () => {
  showNotification(successTemplate);
};

const showErrorSubmitNotification = () => {
  showNotification(errorTemplate);
};

export {showSuccessSubmitNotification, showErrorSubmitNotification};
