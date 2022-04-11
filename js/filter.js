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

      switch (filterPriceElement.value) {
        case 'low': return ad.offer.price <= 10000;
        case 'middle': return ad.offer.price >= 10000 && ad.offer.price <= 50000;
        case 'high': return ad.offer.price >= 50000;
      }
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
