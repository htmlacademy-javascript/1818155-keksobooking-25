import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw Error('Server answered not successfully');
    })
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => showAlert('Не удалось загрузить похожие объявления'));
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://25.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }

      throw Error('Server answered not successfully');
    })
    .catch(onFail);
};

export {getData, sendData};
