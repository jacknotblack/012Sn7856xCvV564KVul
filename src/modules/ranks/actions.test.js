import rankActions from "./actions";

describe("actions", () => {
  it("should create an action to change rank type", () => {
    const text = "gastby";
    const expectedAction = {
      type: "RANK_TYPE_CHANGE",
      payload: text
    };
    expect(rankActions.changeRankName(text)).toEqual(expectedAction);
  });

  it("should create an action to change rank period", () => {
    const text = "weekly";
    const expectedAction = {
      type: "RANK_PERIOD_CHANGE",
      payload: text
    };
    expect(rankActions.changeRankPeriod(text)).toEqual(expectedAction);
  });
});
