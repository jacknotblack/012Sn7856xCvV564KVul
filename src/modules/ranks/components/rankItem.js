import React from "react";
import PropTypes from "prop-types";
import avatar from "../assets/2.3.1.1_ranking_gastby_daily/avatar.jpg";
import "./rankItem.css";

const RankItem = ({ rankNumber, name, stars }) => (
  <div className="rank-item">
    <div className={`rank-number no${rankNumber}`}>No. {rankNumber}</div>
    <div className="avatar-container">
      <img className="avatar" src={avatar} alt="avatar" />
      <div className="name-wrapper">
        <span className="name">{name}</span>
        <div className="star-wrapper">{stars}</div>
      </div>
    </div>
  </div>
);

RankItem.propTypes = {
  rankNumber: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired
};

export default RankItem;
