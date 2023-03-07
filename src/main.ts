import './style.css'
import MapView from "./map/MapView";
import {MapDisplayOptions, MapLocationPolygon} from "./map/values";
import beachFlagImage from './assets/images/beachflag.png'

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

const markerPosition = {lat: 41.41969972671627, lng: -73.27732205009815}

function initMap(): void {
  const mapView = new MapView(document.getElementById('map') as HTMLElement, sandyHookElementarySchoolMapDisplayOptions)

  // 클릭하면 클릭 위치 위도/경도 콘솔 출력
  google.maps.event.addListener(mapView.getMap(), "click", (event: any) => {
    console.table({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  });

  mapView.setLocationPolygon(educationBuildingMapLocationPolygon)
  initController(mapView);

  new google.maps.Marker({
    position: markerPosition,
    map: mapView.getMap(),
    icon: beachFlagImage,
  });

}

declare global {
  interface Window {
    initMap: () => void;
  }
}

function initController(mapView: MapView) {
  const controllerElement = document.getElementById('controller')!;

  const educationBuildingZoomToButton = document.createElement('button')
  educationBuildingZoomToButton.type = 'button'
  educationBuildingZoomToButton.textContent = educationBuildingMapLocationPolygon.locationName

  educationBuildingZoomToButton.addEventListener('click', () => {
    mapView.zoomTo(educationBuildingMapLocationPolygon);
  })

  const resetButton = document.createElement('button');
  resetButton.type = 'button'
  resetButton.textContent = 'reset viewport'

  resetButton.addEventListener('click', () => {
    mapView.resetViewport();
  })

  controllerElement.append(resetButton)
  controllerElement.append(educationBuildingZoomToButton)
}

window.initMap = initMap;
