import { LatLng, LatLngTuple, Map as LeafletMap } from 'leaflet'
import React, { forwardRef } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import LocationMarker from './LocationMarker'
import FilterPageLocationMarker from './FilterPageLocationMarker'


const DEFAULT_POSITION: LatLngTuple = [25.627874, 85.0869669]
const DEFAULT_ZOOM = 13
const TILE_LAYER_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

type MapProps = {
  center?: LatLngTuple;
  onMarkerSet: (latlng: LatLng) => void
}

const FilterPageMap = forwardRef<LeafletMap, MapProps>(({ center, onMarkerSet }, ref) => {
  return (
    <MapContainer
      ref={ref}
      center={center ? new LatLng(center[1], center[0]) : DEFAULT_POSITION}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={false}
      className="size-full"
    >
      <TileLayer
        attribution={TILE_LAYER_ATTRIBUTION}
        url={TILE_LAYER_URL}
      />
      <FilterPageLocationMarker position={center ? new LatLng(center[1], center[0]): undefined } onMarkerSet={onMarkerSet} />
    </MapContainer>
  )
});

export default FilterPageMap