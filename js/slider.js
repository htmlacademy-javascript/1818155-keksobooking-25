import {validateElement} from './form-validation.js';

const MIN_VALUE = 0;
const MAX_VALUE = 100000;
const START_VALUE = 1000;
const STEP = 100;

const adFormElement = document.querySelector('.ad-form');
const sliderElement = adFormElement.querySelector('.ad-form__slider');
const priceElement = adFormElement.querySelector('#price');

const initSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: MIN_VALUE,
      max: MAX_VALUE,
    },
    start: START_VALUE,
    step: STEP,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return value;
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    priceElement.value = sliderElement.noUiSlider.get();
    validateElement(priceElement);
  });
};

const setSliderState = (enabled) => {
  if (enabled) {
    sliderElement.removeAttribute('disabled');
  } else {
    sliderElement.setAttribute('disabled', true);
  }
};

priceElement.addEventListener('change', () => {
  if (!priceElement.value) {
    return;
  }

  const price = parseFloat(priceElement.value);
  if (price >= MIN_VALUE && price <= MAX_VALUE) {
    sliderElement.noUiSlider.set(price);

    // в случае, если слайдер округлил цену под свои допустимые значения, возвращаем её изначальное значение в поле
    if (parseFloat(priceElement.value) !== price) {
      priceElement.value = price;
      validateElement(priceElement);
    }
  }
});

export {initSlider, setSliderState};
