import {createPopup} from './popup.js';

const DEFAULT_COORDINATES = {
  lat: 35.68287,
  lng: 139.75174,
};

const DEFAULT_ZOOM = 12;
const COORDINATES_PRECISION = 5;

const MAIN_MARKER_SIZE = 52;
const COMMON_MARKER_SIZE = 40;

const addressElement = document.querySelector('#address');

let map, markerGroup;

const initMap = (onSuccess) => {
  map = L.map('map-canvas')
    .on('load', onSuccess)
    .setView(DEFAULT_COORDINATES, DEFAULT_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainMarkerIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [MAIN_MARKER_SIZE, MAIN_MARKER_SIZE],
    iconAnchor: [MAIN_MARKER_SIZE / 2, MAIN_MARKER_SIZE],
  });

  const mainMarker = L.marker(
    DEFAULT_COORDINATES,
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
  );

  mainMarker.addTo(map);

  mainMarker.on('moveend', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    addressElement.value = `${lat.toFixed(COORDINATES_PRECISION)}, ${lng.toFixed(COORDINATES_PRECISION)}`;
  });

  markerGroup = L.layerGroup().addTo(map);
};

const updatePins = (ads) => {
  markerGroup.clearLayers();

  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [COMMON_MARKER_SIZE, COMMON_MARKER_SIZE],
    iconAnchor: [COMMON_MARKER_SIZE / 2, COMMON_MARKER_SIZE],
  });

  ads.forEach((ad) => {
    const lat = ad.location.lat;
    const lng = ad.location.lng;

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(createPopup(ad));
  });
};

export {initMap, updatePins};
