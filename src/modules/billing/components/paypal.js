import React, { Component } from "react";
import PropTypes from "prop-types";
import Script from "react-load-script";

const PAYPAL_SCRIPT_URL = "https://www.paypalobjects.com/api/checkout.js";

const renderPaypalButton = options => {
  window.paypal.Button.render(
   options,
    "#paypal-button"
  );
}

class Paypal extends Component {
  constructor() {
    super();
    this.handleScriptError = this.handleScriptError.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
  }

  handleScriptLoad() {
    const paypalOptions = {
      env:  process.env.REACT_APP_PAYPAL_ENV_MODE,
      client: {sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX},
      commit: true, // Show a 'Pay Now' button
      payment: this.props.createPayment,
      onAuthorize: this.props.onPaypalAuthorized,
      onCancel: this.props.cancelPayment
    };
    console.log(process.env)
    console.log(paypalOptions)
    renderPaypalButton(paypalOptions);
    this.props.onPaypalScriptLoaded();
  }
  handleScriptError() {
    this.props.onPaypalScriptLoadFail();
  }

  render() {
    return (
      <div className="paypal">
        <Script
          url= {PAYPAL_SCRIPT_URL}
          onError={this.handleScriptError}
          onLoad={this.handleScriptLoad}
        />
        <div id="paypal-button" />
        <h1 className="paypal-status">STATUS: {this.props.paypalStatus} </h1>
        <span className="payment-detail">
          {JSON.stringify(this.props.paypalPayment)}
        </span>
      </div>
    );
  }
}

Paypal.propTypes = {
  onPaypalScriptLoaded: PropTypes.func.isRequired,
  onPaypalScriptLoadFail: PropTypes.func.isRequired,
  paypalStatus: PropTypes.string.isRequired,
  paypalPayment: PropTypes.string,
  createPayment: PropTypes.func.isRequired,
  onPaypalAuthorized: PropTypes.func.isRequired,
  cancelPayment: PropTypes.func.isRequired
};

Paypal.defaultProps = {
  paypalPayment: undefined
};

export default Paypal;
