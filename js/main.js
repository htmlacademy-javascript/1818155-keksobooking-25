const ADS_COUNT = 10;

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const TIME_POINTS = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getRandomIntFromRange = (from, to) => {
  if (from < 0 || to < 0 || to < from) {
    throw 'Invalid parameters';
  }

  const fromRounded = Math.ceil(from);
  const toRounded = Math.floor(to);

  const difference = toRounded - fromRounded;
  const rand = Math.random();

  return Math.floor(rand * (difference + 1)) + fromRounded;
};

const getRandomFloatFromRange = (from, to, precision) => {
  if (from < 0 || to < 0 || to < from) {
    throw 'Invalid parameters';
  }

  const precisionMultiplier = Math.pow(10, precision);

  // танцы с бубном, чтобы учитывать только переданное количество знаков после запятой в границах диапазона
  // и избавиться таким образом от влияния шальной единички в конце float'а на округление
  const fromPrecision = from.toString().split('.')[1].length || 0;
  const fromShiftedPrecision = Math.max(fromPrecision - precision, 0);
  const fromShiftedPrecisionMultiplier = Math.pow(10, fromShiftedPrecision);

  const toPrecision = to.toString().split('.')[1].length || 0;
  const toShiftedPrecision = Math.max(toPrecision - precision, 0);
  const toShiftedPrecisionMultiplier = Math.pow(10, toShiftedPrecision);

  const fromShifted = Math.ceil(Math.round(from * precisionMultiplier * fromShiftedPrecisionMultiplier) / fromShiftedPrecisionMultiplier);
  const toShifted = Math.floor(Math.round(to * precisionMultiplier * toShiftedPrecisionMultiplier) / toShiftedPrecisionMultiplier);

  return (getRandomIntFromRange(fromShifted, toShifted) / precisionMultiplier).toFixed(precision);
};

const zeroPad = (num, places) => String(num).padStart(places, '0');

const getRandomArrayElement = (elements) => elements[getRandomIntFromRange(0, elements.length - 1)];

const getRandomElements = (elements) => {
  const result = [];

  elements.forEach((element) => {
    const isIncluded = getRandomIntFromRange(0, 1);

    if (isIncluded) {
      result.push(element);
    }
  });

  return result;
};

const createAd = (id) => {
  const latitude = getRandomFloatFromRange(35.65000, 35.70000, 5);
  const longitude = getRandomFloatFromRange(139.70000, 139.80000, 5);

  const rooms = getRandomIntFromRange(1, 10);
  const guests = getRandomIntFromRange(1, 20);

  return {
    author: {
      avatar: `img/avatars/user${zeroPad(id, 2)}.png`,
    },
    offer: {
      title: `Лот №${id}`,
      address: `${latitude}, ${longitude}`,
      price: getRandomIntFromRange(1, Number.MAX_SAFE_INTEGER),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: rooms,
      guests: guests,
      checkin: getRandomArrayElement(TIME_POINTS),
      checkout: getRandomArrayElement(TIME_POINTS),
      features: getRandomElements(FEATURES),
      description: `Уютное жильё, включающее в себя ${rooms} комнат для ${guests} гостей. Уверены, Вам у нас понравится!`,
      photos: getRandomElements(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    }
  };
};

let ads;

const generateAds = () => {
  ads = Array.from({ length: ADS_COUNT }, (v, i) => createAd(i + 1));
};

const getAds = () => ads;

generateAds();
getAds();
