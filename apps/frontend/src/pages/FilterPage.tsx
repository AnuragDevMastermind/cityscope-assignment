import { LatLng, Map as LeafletMap } from 'leaflet';
import { useRef, useState } from "react";
import FilterPageMap from '../components/custom/FilterPageMap';
import SelectFilterBadge from '../components/custom/SelectFilterBadge';
import { Button } from "../components/shadcn/Button";
import { Input } from "../components/shadcn/Input";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { setFeedPage } from "../store/slice/currentPageSlice";
import { setLocationFilter, setPostTypeFilter } from "../store/slice/filterSlice";

function FilterPage() {
  const mapRef = useRef<LeafletMap | null>(null);
  const dispatch = useAppDispatch();

  const filter = useAppSelector((state) => state.filterSlice);

  const [radius, setRadius] = useState<number>(filter.location?.radius ?? 10);
  const [selectedPostType, setSelectedPostType] = useState<string | undefined>(filter.postType);
  const [coordinates, setCoordinates] = useState<[number, number] | undefined>(filter.location?.coordinates);

  const handleApply = () => {

    if (coordinates) {
      dispatch(setLocationFilter({ coordinates, radius }));
    } else {
      dispatch(setLocationFilter(undefined));
    }
    console.log(selectedPostType);

    dispatch(setPostTypeFilter(selectedPostType));
    dispatch(setFeedPage());
  };

  const handleReset = () => {
    setRadius(10);
    setSelectedPostType(undefined);
    setCoordinates(undefined);
  };

  const handleSetLocation = () => {
    mapRef.current?.locate({
      setView: true,
      maxZoom: 16,
      enableHighAccuracy: true
    });
  };

  return (
    <div className="size-full flex flex-col">
      <div className="w-full h-17 border-b flex justify-between px-8 items-center">
        <p className="font-bold text-2xl text-txt-3">Filter</p>
        <div className="flex gap-6">
          <Button onClick={() => dispatch(setFeedPage())} className="px-9" variant="secondary" size="rounded">
            Cancel
          </Button>
          <Button onClick={handleReset} className="px-9" size="rounded">
            Reset
          </Button>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="flex-[2] p-5">
          <div className="size-full flex flex-col">
            <div className="flex justify-between me-1">
              <p className="font-medium text-lg text-txt-3">Select Location</p>

              <div
                role="button"
                onClick={handleSetLocation}
                className="border bg-white -translate-y-1 rounded-lg scale-[80%] p-2 px-4 cursor-pointer shadow-md font-bold transition-transform duration-100 ease-in-out hover:scale-90 active:scale-90"
              >
                📍 Set Current Location
              </div>
            </div>
            <div className="bg-green-300 flex-1 mt-3">
              <FilterPageMap
                ref={mapRef}
                center={coordinates}
                onMarkerSet={(latlng: LatLng) => {
                  setCoordinates([latlng.lng, latlng.lat]);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex-[1] flex flex-col justify-between">
          <div>
            <p className="font-medium text-lg text-txt-3 mt-7 mb-3">Select Badge</p>
            <SelectFilterBadge
              selectedBadge={selectedPostType}
              onClick={(postType) => {
                setSelectedPostType(postType);
              }}
            />
            <p className="font-medium text-lg text-txt-3 mt-7 mb-3">Select Radius</p>
            <div className="flex items-center gap-4">
              <Input
                className="w-20 font-bold text-center"
                type="number"
                value={radius}
                min={1}
                onChange={(e) => setRadius(Number(e.target.value))}
              />
              <p className="font-semibold text-sm text-txt-3">Km</p>
            </div>
          </div>

          <div className="w-full pe-4 pb-5">
            <Button onClick={handleApply} className="w-full" size="rounded">
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPage;
