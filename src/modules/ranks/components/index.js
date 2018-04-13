import React from "react";
import PropTypes from "prop-types";
import TestHeader from "../../../layout/testHeader";

import RankType from "./ranktype";
import RankPeriod from "./rankperiod";
import RankItem from "./rankItem";
import RankItemTop from "./rankItemTop";

import firstPlaceBG from "../assets/2.3.1.1_ranking_gastby_daily/bg_first_gastby_ranking.svg";
import secondPlaceBG from "../assets/2.3.1.1_ranking_gastby_daily/bg_second_ranking.svg";
import thirdPlaceBG from "../assets/2.3.1.1_ranking_gastby_daily/bg_third_ranking.svg";

import "./index.css";

const ranks = ["gastby", "diva", "sunshine"];
const periods = ["daily", "weekly", "monthly"];
const bgs = [firstPlaceBG, secondPlaceBG, thirdPlaceBG];

const Ranks = ({
  selectedRankType,
  selectedRankPeriod,
  onRankTypeClick,
  onRankPeriodClick,
  visibleRanks,
  isWebview
}) => {
  const view = (
    <div>
      <RankType
        ranks={ranks}
        onRankTypeClick={onRankTypeClick}
        selectedRankType={selectedRankType}
      />

      <RankPeriod
        periods={periods}
        onRankPeriodClick={onRankPeriodClick}
        selectedRankPeriod={selectedRankPeriod}
      />
      <div className="rank-container">
        {visibleRanks.map(
          (r, i) =>
            i < 3 ? (
              <RankItemTop
                key={`rankitem${r.stars}`}
                rankNumber={i + 1}
                name={r.name}
                stars={r.stars}
                bg={bgs[i]}
              />
            ) : (
              <RankItem
                key={`rankitem${r.stars}`}
                rankNumber={i + 1}
                name={r.name}
                stars={r.stars}
              />
            )
        )}
      </div>
    </div>
  );
  return isWebview ? view : <TestHeader>{view}</TestHeader>;
};

Ranks.propTypes = {
  onRankTypeClick: PropTypes.func.isRequired,
  onRankPeriodClick: PropTypes.func.isRequired,
  selectedRankType: PropTypes.string.isRequired,
  selectedRankPeriod: PropTypes.string.isRequired,
  visibleRanks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      stars: PropTypes.number.isRequired
    })
  ).isRequired,
  isWebview: PropTypes.bool.isRequired
};

export default Ranks;
