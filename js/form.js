import {isFormValid, resetPriceValidation} from './form-validation.js';
import {resetSlider, setSliderState} from './slider.js';
import {sendData} from './api.js';
import {resetMap, updatePins} from './map.js';

const adFormElement = document.querySelector('.ad-form');
const adFormHeaderElement = adFormElement.querySelector('.ad-form-header');
const adFormFieldsetElements = adFormElement.querySelectorAll('.ad-form__element');
const submitButton = adFormElement.querySelector('.ad-form__submit');
const resetButton = adFormElement.querySelector('.ad-form__reset');

const filtersFormElement = document.querySelector('.map__filters');
const filtersFormFilterElements = filtersFormElement.querySelectorAll('.map__filter');
const filtersFormFeaturesElement = filtersFormElement.querySelector('.map__features');

const setFormState = (isActive) => {
  adFormElement.classList.toggle('ad-form--disabled', !isActive);
  adFormHeaderElement.disabled = !isActive;
  adFormFieldsetElements.forEach((item) => {
    item.disabled = !isActive;
  });

  setSliderState(isActive);
};

const setFiltersState = (isActive) => {
  filtersFormElement.classList.toggle('map__filters--disabled', !isActive);
  filtersFormFilterElements.forEach((item) => {
    item.disabled = !isActive;
  });
  filtersFormFeaturesElement.disabled = !isActive;
};

const deactivatePage = () => {
  setFormState(false);
  setFiltersState(false);
};

const activateForm = () => {
  setFormState(true);
};

const activateFilters = () => {
  setFiltersState(true);
};

let resetPins;

const setResetPins = (cb) => {
  resetPins = cb;
};

const resetPage = () => {
  adFormElement.reset();
  filtersFormElement.reset();

  resetMap();
  if (resetPins) {
    resetPins();
  }

  resetSlider();
  resetPriceValidation();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setFormSubmit = (onSuccess, onFail) => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = isFormValid();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          resetPage();
          unblockSubmitButton();
        },
        () => {
          onFail();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

const setFilterChange = (cb) => {
  filtersFormElement.addEventListener('change', (evt) => {
    if (evt.target.closest('.map__filter') || evt.target.closest('.map__features')) {
      cb();
    }
  });
};

export {deactivatePage, activateForm, activateFilters, setFormSubmit, setFilterChange, setResetPins};
