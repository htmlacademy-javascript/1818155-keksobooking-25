import {generateAds, getAds} from './data.js';
import {activateForm, deactivateForm} from './form.js';
import {initMap, updatePins} from './map.js';

deactivateForm();
initMap(activateForm);

generateAds();
const ads = getAds();
updatePins(ads);
