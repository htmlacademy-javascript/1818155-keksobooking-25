import {
  getRandomIntFromRange,
  getRandomFloatFromRange,
  zeroPad,
  getRandomArrayElement,
  getRandomArrayElements
} from './util.js';

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
      features: getRandomArrayElements(FEATURES),
      description: `Уютное жильё, включающее в себя ${rooms} комнат для ${guests} гостей. Уверены, Вам у нас понравится!`,
      photos: getRandomArrayElements(PHOTOS),
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

export {generateAds, getAds};
