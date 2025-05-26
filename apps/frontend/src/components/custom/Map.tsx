import { LatLng, LatLngTuple, Map as LeafletMap } from 'leaflet'
import { forwardRef } from 'react'
import {
  MapContainer,
  TileLayer
} from 'react-leaflet'
import LocationMarker from './LocationMarker'

const DEFAULT_POSITION: LatLngTuple = [25.627874, 85.0869669]
const DEFAULT_ZOOM = 13
const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

type MapProps = {
  onMarkerSet: (latlng: LatLng) => void
}

const Map = forwardRef<LeafletMap, MapProps>(({ onMarkerSet }, ref) => {
  return (
    <MapContainer
      ref={ref}
      center={DEFAULT_POSITION}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={false}
      className="size-full"
    >
      <TileLayer
        attribution={TILE_LAYER_ATTRIBUTION}
        url={TILE_LAYER_URL}
      />
      <LocationMarker onMarkerSet={onMarkerSet} />
    </MapContainer>
  );
});

export default Map;
