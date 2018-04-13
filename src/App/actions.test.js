import appActions from "./actions";

describe("actions", () => {
  it("should create an action to set isWebview", () => {
    const bool = false;
    const expectedAction = {
      type: "SET_WEBVIEW_MODE",
      payload: bool
    };
    expect(appActions.setWebviewMode(bool)).toEqual(expectedAction);
  });
});
