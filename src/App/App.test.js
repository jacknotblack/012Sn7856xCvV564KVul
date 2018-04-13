import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { Route } from "react-router";
import { createMockStore } from "redux-test-utils";
import { AppConnected, Pure } from "./App";
import Home from "../components/home";
import LoadableRanks from "../modules/ranks/index.lazy";

describe("Desktop", () => {
  describe("render", () => {
    let wrapper;
    const props = {
      isWebview: jest.fn(),
      setWebview: jest.fn(),
      ua: {}
    };

    beforeEach(() => {
      wrapper = shallow(<Pure {...props} />);
    });

    it("renders without crashing", () => {
      expect(wrapper.length).toEqual(1);
    });

    it("should match snapshot", () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("renders correct routes", () => {
      const match = "/ranks";

      /* eslint-disable no-param-reassign */
      const pathMaps = wrapper.find(Route).reduce((pathMap, route) => {
        const routeProps = route.props();
        pathMap[routeProps.path] =
          routeProps.component || routeProps.render(match);
        return pathMap;
      }, {});
      /* eslint-enable no-param-reassign */

      expect(pathMaps["/"]).toBe(Home);
      expect(pathMaps["/ranks"]).toEqual(<LoadableRanks {...{ match }} />);
    });

    it("execute setWebview and isWebview when _willmount executed", () => {
      expect(props.setWebview).toHaveBeenCalled();
      expect(props.isWebview).toHaveBeenCalled();
    });
  });

  describe("container", () => {
    const shallowWithStore = (component, store) => {
      const context = {
        store
      };
      return shallow(component, { context });
    };
    const testState = {
      isWebview: true
    };
    const store = createMockStore(testState);
    const container = shallowWithStore(<AppConnected />, store);

    it("should render successfully", () => {
      expect(container).toBeTruthy();
    });

    it("should dispatch when calling action", () => {
      const props = {
        userAgent: {
          nonWebview: {
            mobile: null,
            os: null,
            phone: null,
            tablet: null,
            md: {
              maxPhoneWidth: 600,
              ua: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) 
            AppleWebKit/537.36 (KHTML, like Gecko) 
            Chrome/62.0.3202.94 Safari/537.36`
            }
          },
          webview: {
            mobile: null,
            os: null,
            phone: null,
            tablet: null,
            md: {
              maxPhoneWidth: 600,
              ua: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) 
            AppleWebKit/537.36 (KHTML, like Gecko) 
            Chrome/62.0.3202.94 Safari/537.36/SENSESTAR/`
            }
          }
        }
      };
      expect(
        container.props().isWebview(props.userAgent.webview.md.ua)
      ).toEqual(true);
      expect(
        container.props().isWebview(props.userAgent.nonWebview.md.ua)
      ).toEqual(false);
      container.props().setWebview(false);
      expect(
        store.isActionDispatched({
          type: "SET_WEBVIEW_MODE",
          payload: false
        })
      ).toEqual(true);
    });
  });
});
