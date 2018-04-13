import httpHelpers from "./httpHelpers";

describe("http helpers", () => {
  describe("urlencode tool", () => {
    it("returns url encoded string with non empty params", () => {
      const url = "www.google.com/smething/more";
      const rawParams = { abc: 123, zzz: "z87c" };
      const expectedString =
        "www.google.com%2Fsmething%2Fmore%3Fabc%3D123%26zzz%3Dz87c";
      const urlencodedString = httpHelpers.urlencode(url, rawParams);
      expect(urlencodedString).toEqual(expectedString);
      expect(httpHelpers.urlencode(url, {})).toEqual(
        "www.google.com%2Fsmething%2Fmore"
      );
      expect(httpHelpers.urlencode(url)).toEqual(
        "www.google.com%2Fsmething%2Fmore"
      );
    });
  });
});
