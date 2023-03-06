import './style.css'

// @ts-ignore
let map: google.maps.Map;

function initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 41.419961, lng: -73.2773997 },
    zoom: 19,
    mapTypeId: 'satellite',
    disableDefaultUI: true,
    zoomControl: true,
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
