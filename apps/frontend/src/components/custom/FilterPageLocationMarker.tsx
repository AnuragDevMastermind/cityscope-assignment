import { LatLng } from "leaflet"
import React, { useState } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"

interface LocationMarkerProps {
  position?: LatLng
  onMarkerSet: (latlng: LatLng) => void
}

const FilterPageLocationMarker: React.FC<LocationMarkerProps> = ({ position, onMarkerSet }) => {

  const map = useMapEvents({
    click(e) {
      map.flyTo(e.latlng, map.getZoom())
      onMarkerSet(e.latlng)
    },
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom())
      onMarkerSet(e.latlng)
    },
  })

  return position === undefined ? null : (
    <Marker position={position}>
      <Popup>{`${position}`}</Popup>
    </Marker>
  )
}

export default FilterPageLocationMarker