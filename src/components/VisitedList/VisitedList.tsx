import React from "react";
import ParkItem from "../ParkItem/ParkItem";
import { Park } from "../../types";

interface Props {
  appData: { [key: string]: Park };
  handleParkSelect(id: string): void;
  handleFavorite(id: string): void;
}

const VisitedList: React.FC<Props> = ({
  appData,
  handleParkSelect,
  handleFavorite
}) => {
  const visitedList = Object.values(appData).filter(park => {
    return park.isFavorite;
  });

  const parkList = visitedList.map(park => {
    return (
      <ParkItem
        key={park.id}
        parkId={park.id}
        parkThumbUrl={park.thumbUrl}
        parkName={park.name}
        parkIsFavorite={park.isFavorite}
        handleParkSelect={handleParkSelect}
        handleFavorite={handleFavorite}
      />
    );
  });

  return (
    <>
      <h2 className="visited__title">VISITED PARKS</h2>
      <div className="park__list">{parkList}</div>
    </>
  );
};

export default VisitedList;
