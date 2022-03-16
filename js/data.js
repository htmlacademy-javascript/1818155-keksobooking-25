import {
  getRandomIntFromRange,
  getRandomFloatFromRange,
  zeroPad,
  getRandomArrayElement,
  getRandomArrayElements
} from './util.js';

const ADS_COUNT = 10;
const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
const COORDINATES_PRECISION = 5;
const ROOMS_NUMBER_MAX = 10;
const GUESTS_NUMBER_MAX = 20;
const AVATAR_FILENAME_DECIMAL_PLACES = 2;
const MAX_PRICE = 100000;

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
  const latitude = getRandomFloatFromRange(LATITUDE_MIN, LATITUDE_MAX, COORDINATES_PRECISION);
  const longitude = getRandomFloatFromRange(LONGITUDE_MIN, LONGITUDE_MAX, COORDINATES_PRECISION);

  const rooms = getRandomIntFromRange(1, ROOMS_NUMBER_MAX);
  const guests = getRandomIntFromRange(1, GUESTS_NUMBER_MAX);

  return {
    author: {
      avatar: `img/avatars/user${zeroPad(id, AVATAR_FILENAME_DECIMAL_PLACES)}.png`,
    },
    offer: {
      title: `Лот №${id}`,
      address: `${latitude}, ${longitude}`,
      price: getRandomIntFromRange(1, MAX_PRICE),
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
