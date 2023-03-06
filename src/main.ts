import './style.css'

const sandyHookElementarySchoolLatLng : google.maps.LatLngLiteral = { lat: 41.419961, lng: -73.2773997 }

function initMap(): void {
  const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: sandyHookElementarySchoolLatLng,
    zoom: 19,
    mapTypeId: 'satellite',
    disableDefaultUI: true,
    zoomControl: true,
  });

  const gymCoords: google.maps.LatLngLiteral[] = [
    { lat: sandyHookElementarySchoolLatLng.lat - 0.00041, lng: sandyHookElementarySchoolLatLng.lng - 0.00060 },
    { lat: sandyHookElementarySchoolLatLng.lat - 0.00028, lng: sandyHookElementarySchoolLatLng.lng - 0.00028 },
    { lat: sandyHookElementarySchoolLatLng.lat - 0.00045, lng: sandyHookElementarySchoolLatLng.lng - 0.00016 },
    { lat: sandyHookElementarySchoolLatLng.lat - 0.00055, lng: sandyHookElementarySchoolLatLng.lng - 0.00050 },
  ];

  // Construct the polygon.
  const gymPolygon = new google.maps.Polygon({
    paths: gymCoords,
    strokeColor: "red",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "red",
    fillOpacity: 0.35,
  })

  gymPolygon.setMap(map);

  // 클릭하면 클릭 위치 위도/경도 콘솔 출력
  google.maps.event.addListener(map, "click", (event: any) => {
    console.table({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
