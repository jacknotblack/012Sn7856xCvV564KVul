import appReducer from "./reducer";

const reducer = appReducer;
describe("todos reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      isWebview: false
    });
  });

  it("should handle SET_WEBVIEW_MODE", () => {
    expect(
      reducer(
        {},
        {
          type: "SET_WEBVIEW_MODE",
          payload: true
        }
      )
    ).toEqual({
      isWebview: true
    });

    expect(
      reducer(
        {
          isWebview: true
        },
        {
          type: "SET_WEBVIEW_MODE",
          payload: true
        }
      )
    ).toEqual({
      isWebview: true
    });
  });
});
