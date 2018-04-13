import React from "react";
import PropTypes from "prop-types";

const RankType = ({ selectedRankType, onRankTypeClick, ranks }) => (
  <div>
    Selected:{selectedRankType}
    {ranks.map(r => (
      <div
        className="typeItem"
        role="presentation"
        key={r}
        onClick={() => onRankTypeClick(r)}
      >
        {r}
      </div>
    ))}
  </div>
);

RankType.propTypes = {
  onRankTypeClick: PropTypes.func.isRequired,
  selectedRankType: PropTypes.string.isRequired,
  ranks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default RankType;
