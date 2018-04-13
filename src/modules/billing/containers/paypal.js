import { connect } from "react-redux";
import {
  paypalScriptLoaded,
  paypalScriptLoadFail,
  createPayment,
  paypalAuthorized,
  cancelPaypalPayment
} from "../../../services/billing/actions";
import Paypal from "../components/paypal";

const mapDispatchToProps = dispatch => ({
  onPaypalScriptLoaded: () => dispatch(paypalScriptLoaded()),
  onPaypalScriptLoadFail: () => dispatch(paypalScriptLoadFail()),
  createPayment: () => dispatch(createPayment()),
  onPaypalAuthorized: payment => dispatch(paypalAuthorized(payment)),
  cancelPayment: payment => dispatch(cancelPaypalPayment(payment))
});

const mapStateToProps = ({ paypal }) => ({
  paypalStatus: paypal.status,
  paypalPayment: paypal.payment
});

const ConnectedPaypal = connect(mapStateToProps, mapDispatchToProps)(Paypal);

export default ConnectedPaypal;
