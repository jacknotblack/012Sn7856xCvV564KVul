import mock from "../../mock";

const initState = {
  category: {
    rankType: "gastby",
    rankPeriod: "daily"
  },
  ranks: mock.ranks
};

const rankReducer = (state = initState, action) => {
  switch (action.type) {
    case "RANK_TYPE_CHANGE":
      return Object.assign({}, state, {
        category: {
          ...state.category,
          rankType: action.payload
        }
      });
    case "RANK_PERIOD_CHANGE":
      return Object.assign({}, state, {
        category: {
          ...state.category,
          rankPeriod: action.payload
        }
      });
    default:
      return state;
  }
}; // NOSONAR

export default rankReducer;
