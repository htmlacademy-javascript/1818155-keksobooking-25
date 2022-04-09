import {getData} from './api.js';
import {deactivatePage, activateForm, activateFilters, setFormSubmit} from './form.js';
import {initMap, updatePins} from './map.js';
import {initSlider} from './slider.js';
import {showSuccessSubmitNotification, showErrorSubmitNotification} from './notifications.js';

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
    updatePins(ads.slice(0, MAX_ADS_COUNT));
    activateFilters();
  });
});
