import http from "../http";

export const paypalScriptLoaded = () => dispatch => {
  dispatch({
    type: "PAYPAL_SCRIPT_LOAD_SUCCESS"
  });
};

export const paypalScriptLoadFail = () => dispatch => {
  dispatch({
    type: "PAYPAL_SCRIPT_LOAD_FAILED"
  });
};

export const createPayment = () => async dispatch => {
  const success = paymentID => ({
    type: "CREATE_PAYPAL_PAYMENT_SUCCESS",
    payload: paymentID
  });

  const failed = error => ({
    type: "CREATE_PAYPAL_PAYMENT_FAILED",
    payload: error
  });
  try {
    dispatch({ type: "CREATE_PAYPAL_PAYMENT" });
    const CREATE_URL = "http://localhost:9011/paypal/create-payment";
    const payment = await window.paypal.request.get(CREATE_URL);
    dispatch(success(payment.id));
    return payment.id;
  } catch (error) {
    dispatch(failed(error));
    return undefined;
  }
};

const executePaypalPayment = payment => async dispatch => {
  const success = data => ({
    type: "EXECUTE_PAYPAL_PAYMENT_SUCCESS",
    payload: data
  });

  const failed = error => ({
    type: "EXECUTE_PAYPAL_PAYMENT_FAILED",
    payload: error
  });

  try {
    dispatch({ type: "EXECUTE_PAYPAL_PAYMENT" });
    const data = await http(
      "POST",
      "https://0cf4e808.ngrok.io/paypal/payment/complete",
      JSON.stringify(payment),
      {
        "Content-Type": "application/json"
      }
    );
    return dispatch(success(await data.json()));
  } catch (error) {
    return dispatch(failed(error));
  }
};

export const cancelPaypalPayment = () => dispatch => {
  dispatch({
    type: "CANCEL_PAYPAL_PAYMENT"
  });
};

export const paypalAuthorized = payment => async dispatch => {
  dispatch({
    type: "PAYPAL_AUTHORIZE_SUCCESS"
  });
  const execute = await dispatch(executePaypalPayment(payment));
  return execute;
};
