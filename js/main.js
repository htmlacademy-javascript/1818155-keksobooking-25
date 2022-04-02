import {generateAds, getAds} from './data.js';
import {activateForm, deactivateForm} from './form.js';
import {initMap, updatePins} from './map.js';
import {initSlider} from './slider.js';

initSlider();
deactivateForm();
initMap(activateForm);

generateAds();
const ads = getAds();
updatePins(ads);
