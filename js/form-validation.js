const adFormElement = document.querySelector('.ad-form');
const roomNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');

const ROOM_NUMBER_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const config = {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'error-text'
};

const pristine = new Pristine(adFormElement, config);

pristine.addValidator(capacityElement,
  (capacityValue) => roomNumberElement.value in ROOM_NUMBER_CAPACITY && ROOM_NUMBER_CAPACITY[roomNumberElement.value].includes(capacityValue),
  'Количество гостей не соответствует количеству комнат');

adFormElement.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

roomNumberElement.addEventListener('change', () => {
  pristine.validate(capacityElement);
});
