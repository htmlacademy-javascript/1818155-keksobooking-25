const adFormElement = document.querySelector('.ad-form');
const adFormHeaderElement = adFormElement.querySelector('.ad-form-header');
const adFormFieldsetElements = adFormElement.querySelectorAll('.ad-form__element');

const filtersFormElement = document.querySelector('.map__filters');
const filtersFromFilterElements = filtersFormElement.querySelectorAll('.map__filter');
const filtersFormFeaturesElement = filtersFormElement.querySelector('.map__features');

const deactivateForm = () => {
  adFormElement.classList.add('ad-form--disabled');
  adFormHeaderElement.disabled = true;
  adFormFieldsetElements.forEach((item) => {
    item.disabled = true;
  });

  filtersFormElement.classList.add('map__filters--disabled');
  filtersFromFilterElements.forEach((item) => {
    item.disabled = true;
  });
  filtersFormFeaturesElement.disabled = true;
};

const activateForm = () => {
  adFormElement.classList.remove('ad-form--disabled');
  adFormHeaderElement.disabled = false;
  adFormFieldsetElements.forEach((item) => {
    item.disabled = false;
  });

  filtersFormElement.classList.remove('map__filters--disabled');
  filtersFromFilterElements.forEach((item) => {
    item.disabled = false;
  });
  filtersFormFeaturesElement.disabled = false;
};

export {deactivateForm, activateForm};
