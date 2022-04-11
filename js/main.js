import {getData} from './api.js';
import {deactivatePage, activateForm, activateFilters, setFormSubmit, setFilterChange, setResetPins} from './form.js';
import {initMap, updatePins} from './map.js';
import {initSlider} from './slider.js';
import {showSuccessSubmitNotification, showErrorSubmitNotification} from './notifications.js';
import {filterAds} from './filter.js';
import {debounce} from './util.js';

const MAX_ADS_COUNT = 10;

initSlider();
deactivatePage();

initMap(() => {
  activateForm();
  setFormSubmit(
    showSuccessSubmitNotification,
    showErrorSubmitNotification
  );
  getData((ads) => {
    const renderPins = () => {
      const filteredAds = filterAds(ads);
      updatePins(filteredAds.slice(0, MAX_ADS_COUNT));
    };

    setResetPins(renderPins);

    renderPins();
    activateFilters();
    setFilterChange(debounce(() => {
      renderPins();
    }));
  });
});
