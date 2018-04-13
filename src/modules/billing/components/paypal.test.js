import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Paypal from "./paypal";

describe("A suite", () => {
  let wrapper;
  const props = {
    onPaypalScriptLoaded: jest.fn(),
    onPaypalScriptLoadFail: jest.fn(),
    paypalStatus: "ready to paypal",
    paypalPayment: "some payment detail",
    createPayment: jest.fn(),
    onPaypalAuthorized: jest.fn(),
    cancelPayment: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<Paypal {...props} />);
    window.paypal = {
      Button: {
        render: () => {
          wrapper.instance().handleScriptError("some error");
        }
      }
    };
  });

  describe("render", () => {
    it("renders without crashing", () => {
      expect(wrapper.length).toEqual(1);
    });

    it("should match snapshot", () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("should render paypal status", () => {
      expect(wrapper.find(".paypal-status").text()).toEqual(
        `STATUS: ${props.paypalStatus} `
      );
    });

    it("should render paypal payment details", () => {
      expect(wrapper.find(".payment-detail").text()).toEqual(
        JSON.stringify(props.paypalPayment)
      );
    });
  });

  describe("scripts", () => {
    it("handles paypal script loaded", () => {
      wrapper.instance().handleScriptLoad();
      expect(props.onPaypalScriptLoaded.mock.calls.length).toEqual(1);
    });

    it("handles paypal script load Error", () => {
      wrapper.instance().handleScriptError();
      expect(props.onPaypalScriptLoadFail.mock.calls.length).toEqual(2);
    });
  });
});
