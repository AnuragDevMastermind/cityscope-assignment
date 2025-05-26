import { useMap } from "react-leaflet"

const LocateControl = () => {
  const map = useMap()

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true })
  }

  return (
    <div
      onClick={handleLocate}
      role="button"
      aria-label="Center map on current location"
      className="absolute top-4 right-4 z-[1000] bg-white rounded-lg p-2 px-4 cursor-pointer shadow-md font-bold transition-transform duration-100 ease-in-out hover:scale-105 active:scale-95"
    >
      📍 My Location
    </div>
  )
}

export default LocateControl