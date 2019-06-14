import React from "react";

interface ProgressBarProps {
  visitedParksNumber: number;
  totalParksNumber: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  visitedParksNumber,
  totalParksNumber
}) => {
  return (
    <div className="intro__progress progress">
      <div className="progress__box">
        <div className="progress__bar">
          <p className="progress__value">{visitedParksNumber}</p>
        </div>
      </div>
      <p className="progress__label">
        <small>out of {totalParksNumber} parks visited</small>
      </p>
    </div>
  );
};

export default ProgressBar;
