import './style.css'

const sandyHookElementarySchoolLatLng : google.maps.LatLngLiteral = { lat: 41.419961, lng: -73.2773997 }

function initMap(): void {
  const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: sandyHookElementarySchoolLatLng,
    zoom: 19,
    mapTypeId: 'satellite',
    disableDefaultUI: true,
    zoomControl: true,
    draggable: false,
    scrollwheel: false,
    panControl: false,
  });

  const gymCoords: google.maps.LatLngLiteral[] = [
    { lat: sandyHookElementarySchoolLatLng.lat - 0.00041, lng: sandyHookElementarySchoolLatLng.lng - 0.00060 },
    { lat: sandyHookElementarySchoolLatLng.lat - 0.00028, lng: sandyHookElementarySchoolLatLng.lng - 0.00028 },
    { lat: sandyHookElementarySchoolLatLng.lat - 0.00045, lng: sandyHookElementarySchoolLatLng.lng - 0.00016 },
    { lat: sandyHookElementarySchoolLatLng.lat - 0.00055, lng: sandyHookElementarySchoolLatLng.lng - 0.00050 },
  ];

  const educationBuildingCoords: google.maps.LatLngLiteral[] = [
    { lat: 41.41979526572689, lng: -73.2775922826564 },
    { lat: 41.41991393478034, lng: -73.27739916360733 },
    { lat: 41.419596142590706, lng: -73.27705584085342 },
    { lat: 41.419493563767126, lng: -73.27724091327545 },
  ];

  // Construct the polygon.
  const gymPolygon = createAreaPolygon(gymCoords)
  const educationBuildingPolygon= createAreaPolygon(educationBuildingCoords)

  gymPolygon.setMap(map);
  educationBuildingPolygon.setMap(map);

  // 클릭하면 클릭 위치 위도/경도 콘솔 출력
  google.maps.event.addListener(map, "click", (event: any) => {
    console.table({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  });
}

function createAreaPolygon (coords: google.maps.LatLngLiteral[]) {
  if (2 > coords.length) {
    throw new Error('coords 의 갯수는 3 이상이여야 합니다.')
  }

  return new google.maps.Polygon({
    paths: coords,
    strokeColor: "red",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "red",
    fillOpacity: 0.35,
  })
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
