import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import http from "../http";
import {
  paypalScriptLoaded,
  paypalScriptLoadFail,
  createPayment,
  paypalAuthorized,
  cancelPaypalPayment
} from "./actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  it("should create an action to store status when paypal script is loaded", () => {
    const expectedAction = [
      {
        type: "PAYPAL_SCRIPT_LOAD_SUCCESS"
      }
    ];

    const store = mockStore({
      paypal: {
        status: "paypal offline",
        payment: undefined,
        error: undefined
      }
    });
    store.dispatch(paypalScriptLoaded());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it("should create an action to store status when paypal script loading failed", () => {
    const expectedAction = [
      {
        type: "PAYPAL_SCRIPT_LOAD_FAILED"
      }
    ];

    const store = mockStore({
      paypal: {
        status: "paypal offline",
        payment: undefined,
        error: undefined
      }
    });
    store.dispatch(paypalScriptLoadFail());
    expect(store.getActions()).toEqual(expectedAction);
  });

  describe("Create payment", () => {
    describe("success", () => {
      it("should create an action to store payment id from backend when create payment", () => {
        const expectedAction = [
          {
            type: "CREATE_PAYPAL_PAYMENT"
          },
          {
            type: "CREATE_PAYPAL_PAYMENT_SUCCESS",
            payload: "PAY-9BR67403W4690904BLJC6TNQ"
          }
        ];
        const store = mockStore({
          paypal: {
            status: "paypal offline",
            payment: undefined,
            error: undefined
          }
        });
        window.paypal = {
          request: {
            get: async url => {
              try {
                const res = await http("GET", url, {}, {});
                const data = await res.json();
                return data;
              } catch (e) {
                return e;
              }
            }
          }
        };

        fetchMock.once("http://localhost:9011/paypal/create-payment", {
          id: "PAY-9BR67403W4690904BLJC6TNQ",
          intent: "sale",
          state: "created",
          payer: { payment_method: "paypal" },
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
              description: "This is the payment transaction description.",
              custom: "EBAY_EMS_90048630024435",
              soft_descriptor: "ECHI5786786",
              payment_options: {
                allowed_payment_method: "INSTANT_FUNDING_SOURCE",
                recurring_flag: false,
                skip_fmf: false
              },
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
                  country_code: "US",
                  phone: "011862212345678"
                }
              },
              related_resources: []
            }
          ],
          note_to_payer: "Contact us for any questions on your order.",
          create_time: "2017-12-29T07:07:33Z",
          links: [
            {
              href:
                "https://api.sandbox.paypal.com/v1/payments/payment/PAY-9BR67403W4690904BLJC6TNQ",
              rel: "self",
              method: "GET"
            },
            {
              href:
                "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-4FA33491KW0285033",
              rel: "approval_url",
              method: "REDIRECT"
            },
            {
              href:
                "https://api.sandbox.paypal.com/v1/payments/payment/PAY-9BR67403W4690904BLJC6TNQ/execute",
              rel: "execute",
              method: "POST"
            }
          ]
        });
        return store.dispatch(createPayment()).then(() => {
          expect.assertions(2);
          expect(store.getActions()[0]).toEqual(expectedAction[0]);
          expect(store.getActions()[1]).toEqual(expectedAction[1]);
        });
      });
    });

    describe("failed", () => {
      it("should create an action to store error sent back from backend when create payment FAILED", () => {
        const expectedAction = [
          {
            type: "CREATE_PAYPAL_PAYMENT"
          },
          {
            type: "CREATE_PAYPAL_PAYMENT_FAILED",
            payload: "bad request"
          }
        ];
        const store = mockStore({
          paypal: {
            status: "paypal offline",
            payment: undefined,
            error: undefined
          }
        });
        window.paypal = {
          request: {
            get: async url => {
              const res = await http("GET", url, {}, {});
              const data = await res.json();
              return data;
            }
          }
        };

        fetchMock.once("http://localhost:9011/paypal/create-payment", {
          status: 404,
          throws: "bad request"
        });
        return store.dispatch(createPayment()).then(() => {
          expect.assertions(2);
          expect(store.getActions()[0]).toEqual(expectedAction[0]);
          expect(store.getActions()[1]).toEqual(expectedAction[1]);
        });
      });
    });
  });

  describe("Execute payment", () => {
    describe("success", () => {
      it("should create an action to store payment detail from backend when execute payment succeeded", () => {
        const expectedAction = [
          {
            type: "PAYPAL_AUTHORIZE_SUCCESS"
          },
          {
            type: "EXECUTE_PAYPAL_PAYMENT"
          },
          {
            type: "EXECUTE_PAYPAL_PAYMENT_SUCCESS",
            payload: {
              id: "PAY-9BR67403W4690904BLJC6TNQ",
              intent: "sale",
              state: "approved",
              cart: "4FA33491KW0285033",
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
                        id: "49069047P80150735",
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
                        parent_payment: "PAY-9BR67403W4690904BLJC6TNQ",
                        create_time: "2017-12-29T07:08:17Z",
                        update_time: "2017-12-29T07:08:17Z",
                        links: [
                          {
                            href:
                              "https://api.sandbox.paypal.com/v1/payments/sale/49069047P80150735",
                            rel: "self",
                            method: "GET"
                          },
                          {
                            href:
                              "https://api.sandbox.paypal.com/v1/payments/sale/49069047P80150735/refund",
                            rel: "refund",
                            method: "POST"
                          },
                          {
                            href:
                              "https://api.sandbox.paypal.com/v1/payments/payment/PAY-9BR67403W4690904BLJC6TNQ",
                            rel: "parent_payment",
                            method: "GET"
                          }
                        ]
                      }
                    }
                  ]
                }
              ],
              create_time: "2017-12-29T07:08:17Z",
              links: [
                {
                  href:
                    "https://api.sandbox.paypal.com/v1/payments/payment/PAY-9BR67403W4690904BLJC6TNQ",
                  rel: "self",
                  method: "GET"
                }
              ]
            }
          }
        ];
        const store = mockStore({
          paypal: {
            status: "paypal offline",
            payment: undefined,
            error: undefined
          }
        });

        fetchMock.postOnce("glob:https://*.ngrok.io/paypal/payment/complete", {
          id: "PAY-9BR67403W4690904BLJC6TNQ",
          intent: "sale",
          state: "approved",
          cart: "4FA33491KW0285033",
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
                    id: "49069047P80150735",
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
                    parent_payment: "PAY-9BR67403W4690904BLJC6TNQ",
                    create_time: "2017-12-29T07:08:17Z",
                    update_time: "2017-12-29T07:08:17Z",
                    links: [
                      {
                        href:
                          "https://api.sandbox.paypal.com/v1/payments/sale/49069047P80150735",
                        rel: "self",
                        method: "GET"
                      },
                      {
                        href:
                          "https://api.sandbox.paypal.com/v1/payments/sale/49069047P80150735/refund",
                        rel: "refund",
                        method: "POST"
                      },
                      {
                        href:
                          "https://api.sandbox.paypal.com/v1/payments/payment/PAY-9BR67403W4690904BLJC6TNQ",
                        rel: "parent_payment",
                        method: "GET"
                      }
                    ]
                  }
                }
              ]
            }
          ],
          create_time: "2017-12-29T07:08:17Z",
          links: [
            {
              href:
                "https://api.sandbox.paypal.com/v1/payments/payment/PAY-9BR67403W4690904BLJC6TNQ",
              rel: "self",
              method: "GET"
            }
          ]
        });
        store.dispatch(paypalAuthorized()).then(() => {
          expect.assertions(3);
          expect(store.getActions()[0]).toEqual(expectedAction[0]);
          expect(store.getActions()[1]).toEqual(expectedAction[1]);
          expect(store.getActions()[2]).toEqual(expectedAction[2]);
        });
      });
    });

    describe("failed", () => {
      it("should create an action from backend when execute payment failed", () => {
        const expectedAction = [
          {
            type: "PAYPAL_AUTHORIZE_SUCCESS"
          },
          {
            type: "EXECUTE_PAYPAL_PAYMENT"
          },
          {
            type: "EXECUTE_PAYPAL_PAYMENT_FAILED",
            payload: "error executing payment"
          }
        ];
        const store = mockStore({
          paypal: {
            status: "paypal offline",
            payment: undefined,
            error: undefined
          }
        });

        fetchMock.postOnce("glob:https://*.ngrok.io/paypal/payment/complete", {
          status: 404,
          throws: "error executing payment"
        });
        store.dispatch(paypalAuthorized()).then(() => {
          expect.assertions(3);
          expect(store.getActions()[0]).toEqual(expectedAction[0]);
          expect(store.getActions()[1]).toEqual(expectedAction[1]);
          expect(store.getActions()[2]).toEqual(expectedAction[2]);
        });
      });
    });

    describe("canceled", () => {
      it("should create an action from backend when execute payment failed", () => {
        const expectedAction = [
          {
            type: "CANCEL_PAYPAL_PAYMENT"
          }
        ];

        const store = mockStore({
          paypal: {
            status: "paypal offline",
            payment: undefined,
            error: undefined
          }
        });
        store.dispatch(cancelPaypalPayment());
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});
