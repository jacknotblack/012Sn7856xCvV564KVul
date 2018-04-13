import { connect } from "react-redux";
import rankActions from "../actions";
import Ranks from "../components/";

const mapDispatchToProps = dispatch => ({
  onRankTypeClick: name => {
    dispatch(rankActions.changeRankName(name));
  },
  onRankPeriodClick: period => {
    dispatch(rankActions.changeRankPeriod(period));
  }
});

const getVisibleRanks = (ranks, type, period) => ranks[type][period];

const mapStateToProps = ({ app, rank }) => ({
  isWebview: app.isWebview,
  selectedRankType: rank.category.rankType,
  selectedRankPeriod: rank.category.rankPeriod,
  visibleRanks: getVisibleRanks(
    rank.ranks,
    rank.category.rankType,
    rank.category.rankPeriod
  )
});

const SelectedRank = connect(mapStateToProps, mapDispatchToProps)(Ranks);

export default SelectedRank;
