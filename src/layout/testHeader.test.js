import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import TestHeader from "./testHeader";

describe("A suite", () => {
  let wrapper;
  const props = {
    children: <div>child</div>
  };

  beforeEach(() => {
    wrapper = shallow(<TestHeader {...props} />);
  });
  it("renders without crashing", () => {
    expect(wrapper.length).toEqual(1);
  });

  it("should match snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders children", () => {
    expect(
      wrapper
        .find("div>div")
        .at(1)
        .text()
    ).toEqual("child");
  });
});
