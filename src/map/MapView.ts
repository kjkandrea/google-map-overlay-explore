import {MapDisplayOptions, MapLocationPolygon} from "./values";

export default class MapView {
  private readonly mapDisplayOptions: MapDisplayOptions;
  private readonly map: google.maps.Map;
  private readonly locationPolygonMap = new Map<MapLocationPolygon['id'], google.maps.Polygon>()
  private readonly dimmedRectangle = this.createDimmedRectangle()

  constructor(mapParentElement: HTMLElement, mapDisplayOptions: MapDisplayOptions) {
    this.mapDisplayOptions = mapDisplayOptions;
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
      this.locationPolygonMap.set(mapLocationPolygon.id, locationPolygon)
    }

    this.locationPolygonMap.get(mapLocationPolygon.id)!.setMap(this.map)
  }

  public removeLocationPolygon(mapLocationPolygonId: MapLocationPolygon['id']) {
    this.locationPolygonMap.get(mapLocationPolygonId)?.setMap(null)
  }

  public zoomTo(mapLocationPolygon: MapLocationPolygon) {
    const target = this.locationPolygonMap.get(mapLocationPolygon.id)
    if (!target) return;
    console.log(this.getCenterLatLngLiteral(mapLocationPolygon.paths))
    this.map.setCenter(this.getCenterLatLngLiteral(mapLocationPolygon.paths))
    this.map.setZoom(20) // mapTypeId: 'satellite' 에는 zoom limit 가 존재하는듯?
  }

  public resetViewport() {
    this.map.setCenter(this.mapDisplayOptions.center)
    this.map.setZoom(this.mapDisplayOptions.defaultZoom)
  }

  public showDimmed(zIndex: number = 1) {
    this.map.setOptions({
      zoomControl: false
    })
    this.dimmedRectangle.setOptions({
      strokeColor: "black",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "black",
      fillOpacity: 0.35,
      zIndex: zIndex,
      map: this.map,
      bounds: this.map.getBounds() as google.maps.LatLngBounds,
    });
  }

  public hideDimmed() {
    this.map.setOptions({
      zoomControl: true
    })
    this.dimmedRectangle.setOptions({
      zIndex: 1,
      map: null
    })
  }

  private createLocationPolygon(coords: google.maps.LatLngLiteral[]): google.maps.Polygon {
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

  private createDimmedRectangle(): google.maps.Rectangle {
    return new google.maps.Rectangle({
      zIndex: 1
    });
  }

  private getCenterLatLngLiteral(paths: google.maps.LatLngLiteral[]): google.maps.LatLngLiteral {
    const total = paths.reduce((acc, {lat, lng}) => ({
      lat: acc.lat + lat,
      lng: acc.lng + lng,
    }), {lat: 0, lng: 0})

    return {
      lat: total.lat / paths.length,
      lng: total.lng / paths.length,
    }
  }
}
