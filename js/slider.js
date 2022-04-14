import {validateElement, resetValidation} from './form-validation.js';

const MIN_VALUE = 0;
const MAX_VALUE = 100000;
const STEP = 100;

const adFormElement = document.querySelector('.ad-form');
const sliderElement = adFormElement.querySelector('.ad-form__slider');
const priceElement = adFormElement.querySelector('#price');

const initSlider = () => {
  const price = priceElement.value;

  noUiSlider.create(sliderElement, {
    range: {
      min: MIN_VALUE,
      max: MAX_VALUE,
    },
    start: price ? price : MIN_VALUE,
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

  priceElement.value = price;
  resetValidation();
};

const setSliderState = (enabled) => {
  if (enabled) {
    sliderElement.removeAttribute('disabled');
  } else {
    sliderElement.setAttribute('disabled', true);
  }
};

const updateSliderValue = (value) => {
  if (!sliderElement.noUiSlider) {
    return;
  }

  sliderElement.noUiSlider.set(value ? value : MIN_VALUE);

  // цена не должна самопроизвольно меняться, даже если не подходит под допустимые значения слайдера
  if (priceElement.value !== value) {
    priceElement.value = value;
    validateElement(priceElement);
  }
};

const updateSliderMinValue = (value) => {
  const price = priceElement.value;

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: value,
        max: MAX_VALUE,
      },
    });
  }

  updateSliderValue(price);
};

priceElement.addEventListener('change', () => {
  updateSliderValue(priceElement.value);
});

export {initSlider, setSliderState, updateSliderMinValue};
