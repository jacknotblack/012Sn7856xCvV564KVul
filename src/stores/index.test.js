import { store, injectReducer } from "./index";

describe("inject reducer", () => {
  it("should update store with new reducer after injection", () => {
    const newReducer = jest.fn;
    injectReducer(store, { key: "newReducer", reducer: newReducer });
    expect(store.asyncReducers.newReducer).toBe(newReducer);
  });
});
