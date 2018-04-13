import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Home from "./home";

describe("A suite", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Home />);
  });
  it("renders without crashing", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("should match snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
