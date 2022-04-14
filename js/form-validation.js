import {updateSliderMinValue} from './slider.js';

const ROOM_NUMBER_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const TYPE_MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const adFormElement = document.querySelector('.ad-form');
const roomNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const typeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');

const setMinPriceByType = () => {
  const type = typeElement.value;

  if (!(type in TYPE_MIN_PRICE)) {
    return;
  }

  const minPrice = TYPE_MIN_PRICE[type];

  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;

  updateSliderMinValue(minPrice);
};

const initPristine = () => {
  const config = {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'error-text'
  };

  const localPristine = new Pristine(adFormElement, config);

  localPristine.addValidator(capacityElement,
    (capacityValue) => roomNumberElement.value in ROOM_NUMBER_CAPACITY && ROOM_NUMBER_CAPACITY[roomNumberElement.value].includes(capacityValue),
    'Количество гостей не соответствует количеству комнат');

  setMinPriceByType();

  return localPristine;
};

const pristine = initPristine();

roomNumberElement.addEventListener('change', () => {
  pristine.validate(capacityElement);
});

const resetValidation = () => {
  setMinPriceByType();
  pristine.reset();
};

typeElement.addEventListener('change', () => {
  resetValidation();

  if (priceElement.value && priceElement.value.length) {
    pristine.validate(priceElement);
  }
});

pristine.addValidator(priceElement,
  (priceValue) => priceValue.length && parseInt(priceValue, 10) >= priceElement.min && parseInt(priceValue, 10) <= priceElement.max,
  () => `Цена должна быть в диапазоне от ${priceElement.min} до ${priceElement.max}`);

timeInElement.addEventListener('change', () => {
  timeOutElement.value = timeInElement.value;
});

timeOutElement.addEventListener('change', () => {
  timeInElement.value = timeOutElement.value;
});

const validateElement = (element) => {
  pristine.validate(element);
};

const checkFormValid = () => pristine.validate();

export {validateElement, checkFormValid, resetValidation};
