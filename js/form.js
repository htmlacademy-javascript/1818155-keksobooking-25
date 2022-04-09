import './form-validation.js';
import {setSliderState} from './slider.js';

const adFormElement = document.querySelector('.ad-form');
const adFormHeaderElement = adFormElement.querySelector('.ad-form-header');
const adFormFieldsetElements = adFormElement.querySelectorAll('.ad-form__element');

const filtersFormElement = document.querySelector('.map__filters');
const filtersFromFilterElements = filtersFormElement.querySelectorAll('.map__filter');
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
  filtersFromFilterElements.forEach((item) => {
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

export {deactivatePage, activateForm, activateFilters};
