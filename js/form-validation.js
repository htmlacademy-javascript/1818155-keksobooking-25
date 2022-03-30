const adFormElement = document.querySelector('.ad-form');
const roomNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const typeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');

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

  return localPristine;
};

let pristine = initPristine();

adFormElement.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

roomNumberElement.addEventListener('change', () => {
  pristine.validate(capacityElement);
});

typeElement.addEventListener('change', () => {
  const type = typeElement.value;

  if (!(type in TYPE_MIN_PRICE)) {
    return;
  }

  const minPrice = TYPE_MIN_PRICE[type];

  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;
  priceElement.dataset.pristineMinMessage = `Значение не может быть меньше ${minPrice}`;

  // не нашла другого способа заставить Pristine подхватить новое значение в min
  pristine.destroy();
  pristine = initPristine();
});
