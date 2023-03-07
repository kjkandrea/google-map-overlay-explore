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
  id: number;
  locationName: string;
  paths: Array<LatLngLiteral>
}
