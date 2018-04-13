import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RankItem from "./rankItem";

describe("A suite", () => {
  let wrapper;
  const props = {
    rankNumber: 4,
    name: "Tony Stark",
    stars: 5167456314675
  };

  beforeEach(() => {
    wrapper = shallow(<RankItem {...props} />);
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
});
