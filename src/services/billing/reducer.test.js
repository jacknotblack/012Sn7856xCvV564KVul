import paypalReducer from "./reducer";

const reducer = paypalReducer;
describe("paypal reducer", () => {
  const initState = {
    status: "paypal offline",
    payment: undefined,
    error: undefined
  };
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      status: "paypal offline",
      payment: undefined,
      error: undefined
    });
  });

  it("PAYPAL_SCRIPT_LOAD_SUCCESS", () => {
    expect(
      reducer(initState, {
        type: "PAYPAL_SCRIPT_LOAD_SUCCESS"
      })
    ).toEqual({
      status: "ready to paypal",
      payment: undefined,
      error: undefined
    });
  });

  it("PAYPAL_SCRIPT_LOAD_FAILED", () => {
    expect(
      reducer(initState, {
        type: "PAYPAL_SCRIPT_LOAD_FAILED"
      })
    ).toEqual({
      status: "paypal load failed",
      payment: undefined,
      error: undefined
    });
  });

  it("CREATE_PAYPAL_PAYMENT", () => {
    expect(
      reducer(initState, {
        type: "CREATE_PAYPAL_PAYMENT"
      })
    ).toEqual({
      status: "asking backend to create payment",
      payment: undefined,
      error: undefined
    });
  });

  it("CREATE_PAYPAL_PAYMENT_SUCCESS", () => {
    expect(
      reducer(initState, {
        type: "CREATE_PAYPAL_PAYMENT_SUCCESS",
        payload: 3
      })
    ).toEqual({
      status: "payment created",
      payment: { id: 3 },
      error: undefined
    });
  });

  it("CREATE_PAYPAL_PAYMENT_FAILED", () => {
    expect(
      reducer(initState, {
        type: "CREATE_PAYPAL_PAYMENT_FAILED",
        payload: "Error: 404"
      })
    ).toEqual({
      status: "payment creation failed",
      payment: undefined,
      error: "Error: 404"
    });
  });

  it("PAYPAL_AUTHORIZE_SUCCESS", () => {
    expect(
      reducer(initState, {
        type: "PAYPAL_AUTHORIZE_SUCCESS"
      })
    ).toEqual({
      status: "payment authorized by user",
      payment: undefined,
      error: undefined
    });
  });

  it("EXECUTE_PAYPAL_PAYMENT", () => {
    expect(
      reducer(initState, {
        type: "EXECUTE_PAYPAL_PAYMENT"
      })
    ).toEqual({
      status: "asking backend to execute the payment",
      payment: undefined,
      error: undefined
    });
  });

  it("EXECUTE_PAYPAL_PAYMENT_SUCCESS", () => {
    expect(
      reducer(initState, {
        type: "EXECUTE_PAYPAL_PAYMENT_SUCCESS",
        payload: {
          id: "PAY-8XK78498NG1020917LJC6AYA",
          intent: "sale",
          state: "approved",
          cart: "8M614936A93269546",
          payer: {
            payment_method: "paypal",
            status: "VERIFIED",
            payer_info: {
              email: "andretw-buyer@gmail.com",
              first_name: "test",
              last_name: "buyer",
              payer_id: "EF7JRTLGELPQU",
              shipping_address: {
                recipient_name: "Hello World",
                line1: "4thFloor",
                line2: "unit#34",
                city: "SAn Jose",
                state: "CA",
                postal_code: "95131",
                country_code: "US"
              },
              country_code: "US"
            }
          },
          transactions: [
            {
              amount: {
                total: "0.99",
                currency: "USD",
                details: {
                  subtotal: "0.90",
                  tax: "0.04",
                  shipping: "1.00",
                  insurance: "0.01",
                  handling_fee: "0.04",
                  shipping_discount: "-1.00"
                }
              },
              payee: {
                merchant_id: "FQZFYDL6LKDKC",
                email: "andretw-facilitator@gmail.com"
              },
              description: "This is the payment transaction description.",
              custom: "EBAY_EMS_90048630024435",
              item_list: {
                items: [
                  {
                    name: "hat",
                    sku: "1",
                    description: "Brown color hat",
                    price: "0.50",
                    currency: "USD",
                    tax: "0.02",
                    quantity: 1
                  },
                  {
                    name: "handbag",
                    sku: "product34",
                    description: "Black color hand bag",
                    price: "0.40",
                    currency: "USD",
                    tax: "0.02",
                    quantity: 1
                  }
                ],
                shipping_address: {
                  recipient_name: "Hello World",
                  line1: "4thFloor",
                  line2: "unit#34",
                  city: "SAn Jose",
                  state: "CA",
                  postal_code: "95131",
                  country_code: "US"
                },
                shipping_phone_number: "011862212345678"
              },
              related_resources: [
                {
                  sale: {
                    id: "70E20459RD9686242",
                    state: "completed",
                    amount: {
                      total: "0.99",
                      currency: "USD",
                      details: {
                        subtotal: "0.90",
                        tax: "0.04",
                        shipping: "1.00",
                        insurance: "0.01",
                        handling_fee: "0.04",
                        shipping_discount: "-1.00"
                      }
                    },
                    payment_mode: "INSTANT_TRANSFER",
                    protection_eligibility: "ELIGIBLE",
                    protection_eligibility_type:
                      "ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE",
                    transaction_fee: { value: "0.33", currency: "USD" },
                    parent_payment: "PAY-8XK78498NG1020917LJC6AYA",
                    create_time: "2017-12-29T06:27:59Z",
                    update_time: "2017-12-29T06:27:59Z",
                    links: [
                      {
                        href:
                          "https://api.sandbox.paypal.com/v1/payments/sale/70E20459RD9686242",
                        rel: "self",
                        method: "GET"
                      },
                      {
                        href:
                          "https://api.sandbox.paypal.com/v1/payments/sale/70E20459RD9686242/refund",
                        rel: "refund",
                        method: "POST"
                      },
                      {
                        href:
                          "https://api.sandbox.paypal.com/v1/payments/payment/PAY-8XK78498NG1020917LJC6AYA",
                        rel: "parent_payment",
                        method: "GET"
                      }
                    ]
                  }
                }
              ]
            }
          ],
          create_time: "2017-12-29T06:27:59Z",
          links: [
            {
              href:
                "https://api.sandbox.paypal.com/v1/payments/payment/PAY-8XK78498NG1020917LJC6AYA",
              rel: "self",
              method: "GET"
            }
          ]
        }
      })
    ).toEqual({
      status: "payment executed",
      payment: {
        id: "PAY-8XK78498NG1020917LJC6AYA",
        intent: "sale",
        state: "approved",
        cart: "8M614936A93269546",
        payer: {
          payment_method: "paypal",
          status: "VERIFIED",
          payer_info: {
            email: "andretw-buyer@gmail.com",
            first_name: "test",
            last_name: "buyer",
            payer_id: "EF7JRTLGELPQU",
            shipping_address: {
              recipient_name: "Hello World",
              line1: "4thFloor",
              line2: "unit#34",
              city: "SAn Jose",
              state: "CA",
              postal_code: "95131",
              country_code: "US"
            },
            country_code: "US"
          }
        },
        transactions: [
          {
            amount: {
              total: "0.99",
              currency: "USD",
              details: {
                subtotal: "0.90",
                tax: "0.04",
                shipping: "1.00",
                insurance: "0.01",
                handling_fee: "0.04",
                shipping_discount: "-1.00"
              }
            },
            payee: {
              merchant_id: "FQZFYDL6LKDKC",
              email: "andretw-facilitator@gmail.com"
            },
            description: "This is the payment transaction description.",
            custom: "EBAY_EMS_90048630024435",
            item_list: {
              items: [
                {
                  name: "hat",
                  sku: "1",
                  description: "Brown color hat",
                  price: "0.50",
                  currency: "USD",
                  tax: "0.02",
                  quantity: 1
                },
                {
                  name: "handbag",
                  sku: "product34",
                  description: "Black color hand bag",
                  price: "0.40",
                  currency: "USD",
                  tax: "0.02",
                  quantity: 1
                }
              ],
              shipping_address: {
                recipient_name: "Hello World",
                line1: "4thFloor",
                line2: "unit#34",
                city: "SAn Jose",
                state: "CA",
                postal_code: "95131",
                country_code: "US"
              },
              shipping_phone_number: "011862212345678"
            },
            related_resources: [
              {
                sale: {
                  id: "70E20459RD9686242",
                  state: "completed",
                  amount: {
                    total: "0.99",
                    currency: "USD",
                    details: {
                      subtotal: "0.90",
                      tax: "0.04",
                      shipping: "1.00",
                      insurance: "0.01",
                      handling_fee: "0.04",
                      shipping_discount: "-1.00"
                    }
                  },
                  payment_mode: "INSTANT_TRANSFER",
                  protection_eligibility: "ELIGIBLE",
                  protection_eligibility_type:
                    "ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE",
                  transaction_fee: {
                    value: "0.33",
                    currency: "USD"
                  },
                  parent_payment: "PAY-8XK78498NG1020917LJC6AYA",
                  create_time: "2017-12-29T06:27:59Z",
                  update_time: "2017-12-29T06:27:59Z",
                  links: [
                    {
                      href:
                        "https://api.sandbox.paypal.com/v1/payments/sale/70E20459RD9686242",
                      rel: "self",
                      method: "GET"
                    },
                    {
                      href:
                        "https://api.sandbox.paypal.com/v1/payments/sale/70E20459RD9686242/refund",
                      rel: "refund",
                      method: "POST"
                    },
                    {
                      href:
                        "https://api.sandbox.paypal.com/v1/payments/payment/PAY-8XK78498NG1020917LJC6AYA",
                      rel: "parent_payment",
                      method: "GET"
                    }
                  ]
                }
              }
            ]
          }
        ],
        create_time: "2017-12-29T06:27:59Z",
        links: [
          {
            href:
              "https://api.sandbox.paypal.com/v1/payments/payment/PAY-8XK78498NG1020917LJC6AYA",
            rel: "self",
            method: "GET"
          }
        ]
      },
      error: undefined
    });
  });

  it("EXECUTE_PAYPAL_PAYMENT_FAILED", () => {
    expect(
      reducer(initState, {
        type: "EXECUTE_PAYPAL_PAYMENT_FAILED"
      })
    ).toEqual({
      status: "payment execution failed",
      payment: undefined,
      error: undefined
    });
  });

  it("CANCEL_PAYPAL_PAYMENT", () => {
    expect(
      reducer(initState, {
        type: "CANCEL_PAYPAL_PAYMENT"
      })
    ).toEqual({
      status: "payment canceled by user",
      payment: undefined,
      error: undefined
    });
  });
});
