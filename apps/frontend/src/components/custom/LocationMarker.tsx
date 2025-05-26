import { LatLng } from "leaflet"
import React, { useState } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"

interface LocationMarkerProps {
  onMarkerSet: (latlng: LatLng) => void
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ onMarkerSet }) => {
  const [position, setPosition] = useState<LatLng | null>(null)
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
      onMarkerSet(e.latlng)
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
      onMarkerSet(e.latlng)
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>{`${position}`}</Popup>
    </Marker>
  )
}

export default LocationMarker