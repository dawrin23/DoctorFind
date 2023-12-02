import { useState } from "react";
import PlaceItemCard from "./PlaceItemCard";
import SideDrawer from "./SideDrawer";
import Skelton from "./Skelton";

function PlaceList({ placeList }: any) {
  const [selectedPlace, setSelectedPlace] = useState<any>([]);
  return (
    <div className="px-[10x] md:px-[100px] mt-7 z-10 ">
      <h1 className="text-[20px] font-bold p-4 text-center ">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {placeList.map((place: any, index: number) => (
          <div
            className="gap-10 flex flex-wrap justify-center cursor-pointer"
            key={index}
            onClick={() => setSelectedPlace(place)}
          >
            <PlaceItemCard place={place} />
          </div>
        ))}
      </div>
      {selectedPlace?.name ? (
        <div className="fixed top-0 right-0 z-20">
          <SideDrawer
            place={selectedPlace}
            close={() => setSelectedPlace([])}
          />
        </div>
      ) : null}

      {placeList?.length == 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <Skelton key={index} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default PlaceList;
