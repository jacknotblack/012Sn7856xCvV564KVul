import React from "react";
import { shallow } from "enzyme";
import { createMockStore } from "redux-test-utils";
import SelectedRank from "./selectedranks";
import mock from "../../../mock";

describe("Desktop", () => {
  describe("container", () => {
    const shallowWithStore = (component, store) => {
      const context = {
        store
      };
      return shallow(component, { context });
    };
    const testState = {
      rank: {
        category: {
          rankType: "gastby",
          rankPeriod: "daily"
        },
        ranks: mock.ranks
      },
      app: {
        isWebview: false
      }
    };
    const store = createMockStore(testState);
    const container = shallowWithStore(<SelectedRank />, store);

    it("should render successfully", () => {
      expect(container).toBeTruthy();
    });

    it("should dispatch when calling action", () => {
      const props = {
        period: "monthly",
        type: "gastby"
      };

      container.props().onRankPeriodClick(props.period);
      expect(
        store.isActionDispatched({
          type: "RANK_PERIOD_CHANGE",
          payload: props.period
        })
      ).toEqual(true);
      container.props().onRankTypeClick(props.type);
      expect(
        store.isActionDispatched({
          type: "RANK_TYPE_CHANGE",
          payload: props.type
        })
      ).toEqual(true);
    });
  });
});
