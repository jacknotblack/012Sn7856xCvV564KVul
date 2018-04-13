import React from "react";
import Loadable from "react-loadable";
import { store, injectReducer } from "../../stores";

const LoadableRanks = Loadable.Map({
  loader: {
    SelectedRank: () => import("./containers/selectedranks.js"),
    reducer: () => import("./reducer.js")
  },
  loading() {
    return <div>Loading...</div>;
  },
  render(loaded, props) {
    const SelectedRank = loaded.SelectedRank.default;
    const reducer = loaded.reducer.default;
    injectReducer(store, { key: "rank", reducer });
    return <SelectedRank {...props} />;
  }
});

export default LoadableRanks;
