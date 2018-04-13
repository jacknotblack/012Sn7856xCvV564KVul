const initState = {
  isWebview: false
};

const rankReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_WEBVIEW_MODE":
      return Object.assign({}, state, {
        isWebview: action.payload
      });
    default:
      return state;
  }
}; // NOSONAR

export default rankReducer;
