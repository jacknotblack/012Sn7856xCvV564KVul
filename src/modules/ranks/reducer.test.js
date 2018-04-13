import rankReducer from "./reducer";
import mock from "../../mock";

const reducer = rankReducer;
describe("todos reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      category: {
        rankType: "gastby",
        rankPeriod: "daily"
      },
      ranks: mock.ranks
    });
  });

  it("should handle RANK_TYPE_CHANGE", () => {
    expect(
      reducer(
        {},
        {
          type: "RANK_TYPE_CHANGE",
          payload: "gastby"
        }
      )
    ).toEqual({
      category: {
        rankType: "gastby"
      }
    });

    expect(
      reducer(
        {
          category: {
            rankType: "gastby",
            rankPeriod: "daily"
          },
          ranks: mock.ranks
        },
        {
          type: "RANK_TYPE_CHANGE",
          payload: "diva"
        }
      )
    ).toEqual({
      category: {
        rankType: "diva",
        rankPeriod: "daily"
      },
      ranks: mock.ranks
    });
  });

  it("should handle RANK_PERIOD_CHANGE", () => {
    expect(
      reducer(
        {},
        {
          type: "RANK_PERIOD_CHANGE",
          payload: "monthly"
        }
      )
    ).toEqual({
      category: {
        rankPeriod: "monthly"
      }
    });

    expect(
      reducer(
        {
          category: {
            rankType: "gastby",
            rankPeriod: "daily"
          },
          ranks: mock.ranks
        },
        {
          type: "RANK_PERIOD_CHANGE",
          payload: "weekly"
        }
      )
    ).toEqual({
      category: {
        rankType: "gastby",
        rankPeriod: "weekly"
      },
      ranks: mock.ranks
    });
  });
});
