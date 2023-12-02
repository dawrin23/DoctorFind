"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import PlaceList from "@/components/PlaceList";

function DashboardPage() {
  const [placeList, setPlaceList] = useState([]);
  useEffect(() => {
    getPlaceList('Doctors in Dominican Republic');
  }, []);

  const getPlaceList = async (value:string) => {
    const result = await fetch(
      "/api/google-place-api?q="+value
    );
    const data = await result.json();

    setPlaceList(data.resp.results);
  };

  return (
    <div>
      <Hero userInput={(value:string)=>getPlaceList(value)} />

      {placeList ? <PlaceList placeList={placeList} /> : null}
    </div>
  );
}

export default DashboardPage;
