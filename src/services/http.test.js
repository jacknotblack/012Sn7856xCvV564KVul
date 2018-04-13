import fetchMock from "fetch-mock";
import http from "./http";

describe("HTTP client", () => {
  const mockResult = {
    GET: {
      message: "GET request received."
    },
    POST: {
      message: "POST request received"
    }
  };
  const testCases = {
    GET: {
      method: "GET",
      url: "http://www.google.com/get",
      params: {
        name: "Jack",
        age: 34
      }
    },
    POST: {
      method: "POST",
      url: "http://www.google.com/post",
      params: {
        name: "Jack",
        age: 34
      }
    },
    OTHER: {
      method: "OTHER",
      url: "http://www.google.com/405",
      params: {
        name: "Jack",
        age: 34
      }
    }
  };
  afterEach(() => {
    fetchMock.reset();
  });
  const { GET, POST, OTHER } = testCases;
  it("should return a promise when invoked with GET method", async () => {
    expect.assertions(2);
    fetchMock.get(`glob:${GET.url}*`, mockResult.GET);
    const res = await http(GET.method, GET.url, GET.params);
    expect(res.ok).toEqual(true);
    expect(await res.text()).toEqual(JSON.stringify(mockResult.GET));
  });

  it("should return a promise when invoked with POST method", async () => {
    expect.assertions(2);
    fetchMock.post(`glob:${POST.url}*`, mockResult.POST);
    const res = await http(POST.method, POST.url, POST.params);
    expect(res.ok).toEqual(true);
    expect(await res.json()).toEqual(mockResult.POST);
  });

  it("should return 405 when invoked with invalid method", async () => {
    expect.assertions(1);
    fetchMock.get(`glob:${OTHER.url}*`, 400);
    const res = await http(OTHER.method, OTHER.url, OTHER.params);
    expect(await res).toEqual(new Error("bad method"));
  });
});
