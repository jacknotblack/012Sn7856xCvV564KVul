import React from "react";
import PropTypes from "prop-types";
import avatar from "../assets/2.3.1.1_ranking_gastby_daily/avatar.jpg";
import "./rankItemTop.css";

const RankItemTop = ({ rankNumber, name, stars, bg }) => (
  <div className={`rank-item-top no${rankNumber}`}>
    <div className={`rank-number no${rankNumber}`}>No. {rankNumber}</div>
    <div className="avatar-container">
      <div className="avatar-wrapper">
        <img src={avatar} alt="avatar" />
        <img src={bg} alt="firstPlaceBG" />
      </div>
      <span className="name">{name}</span>
      <div className="star-wrapper">{stars}</div>
    </div>
  </div>
);

RankItemTop.propTypes = {
  rankNumber: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  bg: PropTypes.string.isRequired
};

export default RankItemTop;
