import {generateAds, getAds} from './data.js';

const OFFER_TYPE_TEXT = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const createPopup = (ad) => {
  const popup = popupTemplate.cloneNode(true);

  popup.querySelector('.popup__title').textContent = ad.offer.title;
  popup.querySelector('.popup__text--address').textContent = ad.offer.address;

  const popupPriceElement = popup.querySelector('.popup__text--price');
  popupPriceElement.innerHTML = `${ad.offer.price} <span>₽/ночь</span>`;

  popup.querySelector('.popup__type').textContent = OFFER_TYPE_TEXT[ad.offer.type];
  popup.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  const popupFeatureElements = popup.querySelectorAll('.popup__feature');
  popupFeatureElements.forEach((featureElement) => {
    const isIncluded = ad.offer.features.some((feature) => featureElement.classList.contains(`popup__feature--${feature}`));

    if (!isIncluded) {
      featureElement.remove();
    }
  });

  if (!ad.offer.features.length) {
    popup.querySelector('.popup__features').remove();
  }

  const popupDescriptionElement = popup.querySelector('.popup__description');
  if (!ad.offer.description) {
    popupDescriptionElement.remove();
  } else {
    popupDescriptionElement.textContent = ad.offer.description;
  }

  const popupPhotoListElement = popup.querySelector('.popup__photos');
  const popupPhotoTemplate = popupPhotoListElement.querySelector('img');
  ad.offer.photos.forEach((photo) => {
    const photoElement = popupPhotoTemplate.cloneNode(true);
    photoElement.src = photo;
    popupPhotoListElement.append(photoElement);
  });
  popupPhotoTemplate.remove();

  if (!ad.offer.photos.length) {
    popupPhotoListElement.remove();
  }

  const popupAvatarElement = popup.querySelector('.popup__avatar');
  if (!ad.author.avatar) {
    popupAvatarElement.remove();
  } else {
    popupAvatarElement.src = ad.author.avatar;
  }

  return popup;
};

const createPopups = () => {
  generateAds();
  const ads = getAds();
  return ads.map((ad) => createPopup(ad));
};

const drawPopup = () => {
  const mapCanvas = document.querySelector('#map-canvas');
  const popups = createPopups();
  mapCanvas.append(popups[0]);
};

export {drawPopup};
