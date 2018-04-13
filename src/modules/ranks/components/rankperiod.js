import React from "react";
import PropTypes from "prop-types";

const RankPeriod = ({ selectedRankPeriod, onRankPeriodClick, periods }) => (
  <div>
    Selected:{selectedRankPeriod}
    {periods.map(r => (
      <div
        className="periodItem"
        role="presentation"
        key={r}
        onClick={() => onRankPeriodClick(r)}
      >
        {r}
      </div>
    ))}
  </div>
);

RankPeriod.propTypes = {
  onRankPeriodClick: PropTypes.func.isRequired,
  selectedRankPeriod: PropTypes.string.isRequired,
  periods: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default RankPeriod;
