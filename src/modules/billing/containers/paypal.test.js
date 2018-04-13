import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import ConnectedPaypal from "./paypal";
import http from "../../../services/http";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("container", () => {
  const shallowWithStore = (component, store) => {
    const context = {
      store
    };
    return shallow(component, { context });
  };
  const testState = {
    paypal: {
      status: "paypal offline",
      payment: ""
    }
  };
  const store = mockStore(testState);
  const container = shallowWithStore(<ConnectedPaypal />, store);
  afterEach(() => {
    store.clearActions();
  });

  it("should render successfully", () => {
    expect(container).toBeTruthy();
  });

  it("should dispatch when calling action onPaypalScriptLoaded", () => {
    container.props().onPaypalScriptLoaded();
    expect(store.getActions()).toEqual([
      {
        type: "PAYPAL_SCRIPT_LOAD_SUCCESS"
      }
    ]);
  });
  it("should dispatch when calling action onPaypalScriptLoadFail", () => {
    container.props().onPaypalScriptLoadFail();
    expect(store.getActions()).toEqual([
      {
        type: "PAYPAL_SCRIPT_LOAD_FAILED"
      }
    ]);
  });

  window.paypal = {
    request: {
      get: async url => {
        const res = await http("GET", url, {}, {});
        const data = await res.json();
        return data;
      }
    }
  };
  it("should dispatch when calling action createPayment", () => {
    container.props().createPayment();
    expect(store.getActions()).toEqual([
      {
        type: "CREATE_PAYPAL_PAYMENT"
      }
    ]);
  });

  it("should dispatch when calling action onPaypalAuthorized", () => {
    container.props().onPaypalAuthorized("some payment");
    expect(store.getActions()).toEqual([
      {
        type: "PAYPAL_AUTHORIZE_SUCCESS"
      },
      {
        type: "EXECUTE_PAYPAL_PAYMENT"
      }
    ]);
  });

  it("should dispatch when calling action cancelPaypalPayment", () => {
    container.props().cancelPayment();
    expect(store.getActions()).toEqual([
      {
        type: "CANCEL_PAYPAL_PAYMENT"
      }
    ]);
  });
});
