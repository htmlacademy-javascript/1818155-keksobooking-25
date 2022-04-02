import {createPopup} from './popup.js';

const DEFAULT_COORDINATES = {
  lat: 35.68287,
  lng: 139.75174,
};

const DEFAULT_ZOOM = 12;
const COORDINATES_PRECISION = 5;

const addressElement = document.querySelector('#address');

let map, markerGroup;

const initMap = (cb) => {
  map = L.map('map-canvas')
    .on('load', cb)
    .setView(DEFAULT_COORDINATES, DEFAULT_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainMarkerIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
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
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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
