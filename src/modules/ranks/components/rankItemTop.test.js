import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RankItemTop from "./rankItemTop";

describe("A suite", () => {
  let wrapper;
  const props = {
    rankNumber: 2,
    name: "Iron Man",
    stars: 95167456314675,
    bg: "../assets/2.3.1.1_ranking_gastby_daily/bg_second_ranking.svg"
  };

  beforeEach(() => {
    wrapper = shallow(<RankItemTop {...props} />);
  });
  it("renders without crashing", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("should match snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render name", () => {
    expect(wrapper.find(".name").text()).toEqual(props.name);
  });

  it("should render star numbers", () => {
    expect(wrapper.find(".star-wrapper").text()).toEqual(
      props.stars.toString()
    );
  });

  it("should render rank numbers", () => {
    expect(wrapper.find(".rank-number").text()).toEqual(
      `No. ${props.rankNumber}`
    );
  });

  it("should add class according to rank number to rank-number div", () => {
    expect(wrapper.find(".rank-number").hasClass(`no${props.rankNumber}`));
  });

  it("should render right avatar wrapper", () => {
    expect(
      wrapper
        .find(".avatar-wrapper img")
        .at(1)
        .prop("src")
    ).toEqual(props.bg);
  });
});
