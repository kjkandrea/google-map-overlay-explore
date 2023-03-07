import './style.css'
import MapView from "./map/MapView";
import {MapDisplayOptions, MapLocationPolygon} from "./map/values";

const sandyHookElementarySchoolMapDisplayOptions: MapDisplayOptions = {
  mapName: 'Sandy Hook Elementary School',
  center: { lat: 41.419961, lng: -73.2773997 },
  defaultZoom: 19
}

const educationBuildingMapLocationPolygon: MapLocationPolygon = {
  id: 1,
  locationName: 'Education Building',
  paths: [
    { lat: 41.41979526572689, lng: -73.2775922826564 },
    { lat: 41.41991393478034, lng: -73.27739916360733 },
    { lat: 41.419596142590706, lng: -73.27705584085342 },
    { lat: 41.419493563767126, lng: -73.27724091327545 },
  ]
}

function initMap(): void {
  const mapView = new MapView(document.getElementById('map') as HTMLElement, sandyHookElementarySchoolMapDisplayOptions)
  mapView.setLocationPolygon(educationBuildingMapLocationPolygon)

  // 클릭하면 클릭 위치 위도/경도 콘솔 출력
  google.maps.event.addListener(mapView.getMap(), "click", (event: any) => {
    console.table({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  });

  setTimeout(() => {
    mapView.zoomTo(educationBuildingMapLocationPolygon);
  }, 2000)
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
