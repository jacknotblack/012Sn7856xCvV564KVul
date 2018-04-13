const rankActions = {
  changeRankName: type => ({
    type: "RANK_TYPE_CHANGE",
    payload: type
  }),
  changeRankPeriod: period => ({
    type: "RANK_PERIOD_CHANGE",
    payload: period
  })
};

export default rankActions;
