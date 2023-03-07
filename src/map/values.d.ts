export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface MapDisplayOptions {
  mapName: string;
  center: LatLngLiteral;
  defaultZoom: number;
}

export interface MapLocationPolygon {
  locationName: string;
  paths: Array<LatLngLiteral>
}
