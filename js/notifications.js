import {isEscapeKey} from './util.js';

const bodyElement = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const closeNotification = () => {
  const notification = document.querySelector('.notification-shown');
  if (notification) {
    notification.remove();
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onNotificationEscKeydown);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', onNotificationClick);
  }
};

const onNotificationEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeNotification();
  }
};

const onNotificationClick = () => {
  closeNotification();
};

const showNotification = (template) => {
  const notification = template.cloneNode(true);
  notification.classList.add('notification-shown');

  const closeErrorButton = notification.querySelector('.error__button');
  if (closeErrorButton) {
    closeErrorButton.addEventListener('click', closeNotification);
  }

  document.addEventListener('keydown', onNotificationEscKeydown);
  document.addEventListener('click', onNotificationClick);

  bodyElement.insertAdjacentElement('beforeend', notification);
};

const showSuccessSubmitNotification = () => {
  showNotification(successTemplate);
};

const showErrorSubmitNotification = () => {
  showNotification(errorTemplate);
};

export {showSuccessSubmitNotification, showErrorSubmitNotification};
