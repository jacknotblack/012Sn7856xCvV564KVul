import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, withRouter } from "react-router";
import withUserAgent from "react-useragent";
import { connect } from "react-redux";
import "./App.css";
import appActions from "./actions";
import Home from "../components/home";
import LoadableRanks from "../modules/ranks/index.lazy";
import LoadableBilling from "../modules/billing/index.lazy";

class App extends Component {
  componentWillMount() {
    this.props.setWebview(this.props.isWebview());
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route
          path="/ranks"
          render={match => <LoadableRanks {...{ match }} />}
        />
        <Route
          path="/billing"
          render={match => <LoadableBilling {...{ match }} />}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setWebview: isWebview => {
    dispatch(appActions.setWebviewMode(isWebview));
  },
  isWebview: userAgent => /SENSESTAR/.test(userAgent)
});

App.propTypes = {
  setWebview: PropTypes.func.isRequired,
  isWebview: PropTypes.func.isRequired
};

export const AppConnected = connect(null, mapDispatchToProps)(
  withUserAgent(App)
);
export default withRouter(AppConnected);
export { App as Pure };
