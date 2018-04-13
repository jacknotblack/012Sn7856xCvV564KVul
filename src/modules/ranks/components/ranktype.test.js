import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RankType from "./ranktype";

describe("A suite", () => {
  let wrapper;
  const props = {
    selectedRankType: "gastby",
    onRankTypeClick: jest.fn(),
    ranks: ["gastby", "diva", "sunshine"]
  };

  beforeEach(() => {
    wrapper = shallow(<RankType {...props} />);
  });
  it("renders without crashing", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("should match snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render 3 type options", () => {
    expect(wrapper.find(".typeItem")).toHaveLength(props.ranks.length);
  });

  it("should render period options with right names", () => {
    expect(wrapper.find(".typeItem").map(n => n.text())).toEqual(props.ranks);
  });

  it("should call onRankTypeClick if onClick", () => {
    const tab = wrapper.find(".typeItem");
    tab.map(t => t.props().onClick());
    expect(props.onRankTypeClick.mock.calls.length).toBe(tab.length);
  });
});
