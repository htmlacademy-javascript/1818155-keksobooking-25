const PRICE_FILTER = {
  'low': {
    MIN_PRICE: 0,
    MAX_PRICE: 10000,
  },
  'middle': {
    MIN_PRICE: 10000,
    MAX_PRICE: 50000,
  },
  'high': {
    MIN_PRICE: 50000,
    MAX_PRICE: 100000,
  },
};

const filterFormElement = document.querySelector('.map__filters');
const filterTypeElement = filterFormElement.querySelector('#housing-type');
const filterPriceElement = filterFormElement.querySelector('#housing-price');
const filterRoomsElement = filterFormElement.querySelector('#housing-rooms');
const filterGuestsElement = filterFormElement.querySelector('#housing-guests');
const filterFeaturesElements = filterFormElement.querySelectorAll('input[name="features"]');

const compareAds = (ad1, ad2) => {
  const rank1 = ad1.offer.features ? ad1.offer.features.length : 0;
  const rank2 = ad2.offer.features ? ad2.offer.features.length : 0;

  return rank2 - rank1;
};

const filterAds = (ads) => {
  const activeFeatureFilters = Array.from(filterFeaturesElements)
    .filter((feature) => feature.checked)
    .map((feature) => feature.value);

  const result = ads
    // фильтр по типу жилья
    .filter((ad) => filterTypeElement.value === 'any' || ad.offer.type === filterTypeElement.value)
    // фильтр по цене
    .filter((ad) => {
      if (filterPriceElement.value === 'any') {
        return true;
      }

      if (!(filterPriceElement.value in PRICE_FILTER)) {
        return true;
      }

      const currentPriceFilter = PRICE_FILTER[filterPriceElement.value];
      return ad.offer.price >= currentPriceFilter.MIN_PRICE && ad.offer.price <= currentPriceFilter.MAX_PRICE;
    })
    // фильтр по количеству комнат
    .filter((ad) => filterRoomsElement.value === 'any' || ad.offer.rooms === parseInt(filterRoomsElement.value, 10))
    // фильтр по количеству гостей
    .filter((ad) => filterGuestsElement.value === 'any' || ad.offer.guests === parseInt(filterGuestsElement.value, 10))
    // фильтр по наличию удобств
    .filter((ad) => {
      if (!activeFeatureFilters.length) {
        return true;
      }

      if (!ad.offer.features || !ad.offer.features.length) {
        return false;
      }

      return activeFeatureFilters.every((featureFilter) => ad.offer.features.includes(featureFilter));
    });

  // отсортируем прошедшие фильтр объявления по количеству удобств
  return result.sort(compareAds);
};

export {filterAds};
