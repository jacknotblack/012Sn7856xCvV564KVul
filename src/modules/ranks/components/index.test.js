import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Ranks from "./index";

describe("render", () => {
  let wrapper;
  describe("is webview", () => {
    const props = {
      selectedRankType: "sunshine",
      selectedRankPeriod: "weekly",
      onRankTypeClick: jest.fn,
      onRankPeriodClick: jest.fn,
      visibleRanks: [
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 }
      ],
      isWebview: true
    };
    beforeEach(() => {
      wrapper = shallow(<Ranks {...props} />);
    });
    it("renders without crashing", () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find("TestHeader").length).toEqual(0);
      expect(wrapper.find("RankType").length).toEqual(1);
      expect(wrapper.find("RankPeriod").length).toEqual(1);
      expect(wrapper.find(".rank-container").length).toEqual(1);
      expect(wrapper.find("RankItemTop").length).toEqual(3);
      expect(wrapper.find("RankItem").length).toEqual(
        props.visibleRanks.length - 3
      );
    });

    it("should match snapshot", () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
  describe("non webview", () => {
    const props = {
      selectedRankType: "sunshine",
      selectedRankPeriod: "weekly",
      onRankTypeClick: jest.fn,
      onRankPeriodClick: jest.fn,
      visibleRanks: [
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 },
        { name: "myname", stars: 123 }
      ],
      isWebview: false
    };

    beforeEach(() => {
      wrapper = shallow(<Ranks {...props} />);
    });
    it("renders without crashing", () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find("TestHeader").length).toEqual(1);
      expect(wrapper.find("RankType").length).toEqual(1);
      expect(wrapper.find("RankPeriod").length).toEqual(1);
      expect(wrapper.find(".rank-container").length).toEqual(1);
      expect(wrapper.find("RankItemTop").length).toEqual(3);
      expect(wrapper.find("RankItem").length).toEqual(
        props.visibleRanks.length - 3
      );
    });

    it("should match snapshot", () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
