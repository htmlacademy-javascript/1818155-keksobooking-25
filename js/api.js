import {showAlert} from './util.js';

const GET_URL = 'https://25.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(GET_URL)
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
  fetch(POST_URL, {
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
