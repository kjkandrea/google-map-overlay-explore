import './style.css'
import MapView from "./map/MapView";
import {MapDisplayOptions, MapLocationPolygon} from "./map/values";
import beachFlagImage from './assets/images/beachflag.png'

const sandyHookElementarySchoolMapDisplayOptions: MapDisplayOptions = {
  mapName: 'Sandy Hook Elementary School',
  center: {lat: 41.419961, lng: -73.2773997},
  defaultZoom: 19
}

const educationBuildingMapLocationPolygon: MapLocationPolygon = {
  id: 1,
  locationName: 'Education Building',
  paths: [
    {lat: 41.41979526572689, lng: -73.2775922826564},
    {lat: 41.41991393478034, lng: -73.27739916360733},
    {lat: 41.419596142590706, lng: -73.27705584085342},
    {lat: 41.419493563767126, lng: -73.27724091327545},
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

}

declare global {
  interface Window {
    initMap: () => void;
  }
}

function initController(mapView: MapView) {
  const controllerElement = document.getElementById('controller')!;

  const marker = createMarker()
  const infoWindow = createInfoWindow()

  controllerElement.append(createResetButton())
  controllerElement.append(createEducationBuildingZoomToButton())
  controllerElement.append(createShowMarkerToEducationBuildingButton())
  controllerElement.append(createHideMarkerToEducationBuildingButton())

  function createMarker() {
    const marker = new google.maps.Marker({
      position: markerPosition,
      map: mapView.getMap(),
      icon: beachFlagImage,
      opacity: 1,
      zIndex: 2,
    });

    marker.addListener('click', () => {
      if (marker.getOpacity() === 0) {
        return;
      }
      infoWindow.open({
        anchor: marker,
        map: mapView.getMap(),
      });
      mapView.showDimmed(1)
    })

    return marker;
  }

  function createInfoWindow() {
    const infoWindow = new google.maps.InfoWindow({
      content: `
      <div>
        <h1>Our Values</h1>
        <p>We believe in being open and accepng of ourselves, others and life.</p>
        <p>We believe in listening to and sensing other’s thoughts and feelings while finding ways to support them.</p>
      </div>
    `,
      ariaLabel: "Uluru",
      zIndex: 2,
    });

    infoWindow.addListener('closeclick', () => {
      mapView.hideDimmed()
    })

    return infoWindow;
  }

  function createResetButton() {
    const resetButton = document.createElement('button');
    resetButton.type = 'button'
    resetButton.textContent = 'reset viewport'

    resetButton.addEventListener('click', () => {
      mapView.resetViewport();
    })
    return resetButton;
  }

  function createEducationBuildingZoomToButton() {
    const educationBuildingZoomToButton = document.createElement('button')
    educationBuildingZoomToButton.type = 'button'
    educationBuildingZoomToButton.textContent = educationBuildingMapLocationPolygon.locationName

    educationBuildingZoomToButton.addEventListener('click', () => {
      mapView.zoomTo(educationBuildingMapLocationPolygon);
    })
    return educationBuildingZoomToButton;
  }


  function createShowMarkerToEducationBuildingButton() {
    const showMarkerToEducationBuildingButton = document.createElement('button')
    showMarkerToEducationBuildingButton.type = 'button'
    showMarkerToEducationBuildingButton.textContent = `show ${educationBuildingMapLocationPolygon.locationName} marker`

    showMarkerToEducationBuildingButton.addEventListener('click', () => {
      marker.setOpacity(1)
    })

    return showMarkerToEducationBuildingButton;
  }

  function createHideMarkerToEducationBuildingButton() {
    const hideMarkerToEducationBuildingButton = document.createElement('button')
    hideMarkerToEducationBuildingButton.type = 'button'
    hideMarkerToEducationBuildingButton.textContent = `hide ${educationBuildingMapLocationPolygon.locationName} marker`

    hideMarkerToEducationBuildingButton.addEventListener('click', () => {
      marker.setOpacity(0)
      mapView.hideDimmed()
      infoWindow.close()
    })

    return hideMarkerToEducationBuildingButton;
  }

}

window.initMap = initMap;
