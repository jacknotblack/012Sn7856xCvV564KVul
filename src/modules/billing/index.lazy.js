import React from "react";
import Loadable from "react-loadable";
import { store, injectReducer } from "../../stores";

const LoadableBilling = Loadable.Map({
  loader: {
    ConnectedPaypal: () => import("./containers/paypal.js"),
    reducer: () => import("../../services/billing/reducer.js")
  },
  loading() {
    return <div>Loading...</div>;
  },
  render(loaded, props) {
    const ConnectedPaypal = loaded.ConnectedPaypal.default;
    const reducer = loaded.reducer.default;
    injectReducer(store, { key: "paypal", reducer });
    return <ConnectedPaypal {...props} />;
  }
});

export default LoadableBilling;
