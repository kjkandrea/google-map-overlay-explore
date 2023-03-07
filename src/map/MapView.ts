import {MapDisplayOptions, MapLocationPolygon} from "./values";

export default class MapView {
  private readonly map: google.maps.Map;
  private readonly locationPolygonMap = new Map<MapLocationPolygon['id'], google.maps.Polygon>()

  constructor(mapParentElement: HTMLElement, mapDisplayOptions: MapDisplayOptions) {
    this.map = new google.maps.Map(mapParentElement, {
      center: mapDisplayOptions.center,
      zoom: mapDisplayOptions.defaultZoom,
      mapTypeId: 'satellite',
      disableDefaultUI: true,
      zoomControl: true,
      draggable: false,
      scrollwheel: false,
      panControl: false,
    });
  }

  public getMap(): google.maps.Map {
    return this.map;
  }

  public setLocationPolygon(mapLocationPolygon: MapLocationPolygon) {
    if (!this.locationPolygonMap.has(mapLocationPolygon.id)) {
      const locationPolygon = this.createLocationPolygon(mapLocationPolygon.paths)
      this.locationPolygonMap.set(mapLocationPolygon.id,  locationPolygon)
    }

    this.locationPolygonMap.get(mapLocationPolygon.id)!.setMap(this.map)
  }

  public removeLocationPolygon(mapLocationPolygonId: MapLocationPolygon['id']) {
    this.locationPolygonMap.get(mapLocationPolygonId)?.setMap(null)
  }

  private createLocationPolygon (coords: google.maps.LatLngLiteral[]): google.maps.Polygon {
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
}
