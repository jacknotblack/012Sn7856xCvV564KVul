import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RankPeriod from "./rankperiod";

describe("A suite", () => {
  let wrapper;
  const props = {
    selectedRankPeriod: "daily",
    onRankPeriodClick: jest.fn(),
    periods: ["daily", "weekly", "monthly"]
  };

  beforeEach(() => {
    wrapper = shallow(<RankPeriod {...props} />);
  });
  it("renders without crashing", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("should match snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render 3 period options", () => {
    expect(wrapper.find(".periodItem")).toHaveLength(props.periods.length);
  });

  it("should render period options with right names", () => {
    expect(wrapper.find(".periodItem").map(n => n.text())).toEqual(
      props.periods
    );
  });

  it("should call onRankPeriodClick if onClick", () => {
    const tab = wrapper.find(".periodItem");
    tab.map(t => t.props().onClick());
    expect(props.onRankPeriodClick.mock.calls.length).toBe(tab.length);
    expect(props.onRankPeriodClick.mock.calls.map(c => c[0])).toEqual(
      props.periods
    );
  });
});
