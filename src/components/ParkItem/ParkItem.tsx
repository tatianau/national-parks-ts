import React from "react";
import FavButton from "../FavButton/FavButton";

const ParkItem = () => {
  const bgImageStyle = `linear-gradient(rgba(38,38,38,.8),rgba(38,38,38,.8)), url('')`;

  return (
    <div className="park__item" style={{ backgroundImage: bgImageStyle }}>
      <FavButton />
      <h3 className="park__title">
        <a className="park__explore" href="#detail">
          'park.name'
        </a>
      </h3>
    </div>
  );
};

export default ParkItem;
