const initState = {
  status: "paypal offline",
  payment: undefined,
  error: undefined
};

const paypalReducer = (state = initState, action) => {
  switch (action.type) {
    case "PAYPAL_SCRIPT_LOAD_SUCCESS":
      return Object.assign({}, state, {
        status: "ready to paypal"
      });
    case "PAYPAL_SCRIPT_LOAD_FAILED":
      return Object.assign({}, state, {
        status: "paypal load failed"
      });
    case "CREATE_PAYPAL_PAYMENT":
      return Object.assign({}, state, {
        status: "asking backend to create payment"
      });
    case "CREATE_PAYPAL_PAYMENT_SUCCESS":
      return Object.assign({}, state, {
        payment: { id: action.payload },
        status: "payment created"
      });
    case "CREATE_PAYPAL_PAYMENT_FAILED":
      return Object.assign({}, state, {
        error: action.payload,
        status: "payment creation failed"
      });
    case "PAYPAL_AUTHORIZE_SUCCESS":
      return Object.assign({}, state, {
        status: "payment authorized by user"
      });
    case "EXECUTE_PAYPAL_PAYMENT":
      return Object.assign({}, state, {
        status: "asking backend to execute the payment"
      });
    case "EXECUTE_PAYPAL_PAYMENT_SUCCESS":
      return Object.assign({}, state, {
        payment: action.payload,
        status: "payment executed"
      });
    case "EXECUTE_PAYPAL_PAYMENT_FAILED":
      return Object.assign({}, state, {
        payment: action.payload,
        status: "payment execution failed"
      });
    case "CANCEL_PAYPAL_PAYMENT":
      return Object.assign({}, state, {
        status: "payment canceled by user"
      });
    default:
      return state;
  }
}; // NOSONAR

export default paypalReducer;
