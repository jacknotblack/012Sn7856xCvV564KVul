const appActions = {
  setWebviewMode: isWebview => ({
    type: "SET_WEBVIEW_MODE",
    payload: isWebview
  })
};

export default appActions;
