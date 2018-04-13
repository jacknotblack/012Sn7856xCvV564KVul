const httpGET = (url, params, headers) => {
  const queryUrl = Object.entries(params).reduce(
    (queryStringSegment, [key, value]) =>
      `${queryStringSegment}&${key}=${value}`,
    `${url}${Object.entries(params).length > 0 ? "?" : ""}`
  );
  return fetch(queryUrl, { headers });
};

const httpPOST = (url, params, headers) =>
  fetch(url, {
    method: "POST",
    body: params,
    headers
  });
/**
 * 
 * @param {*} method 
 * @param {string} url 
 * @param {*} params 
 * @param {*} headers 
 */
const http = (method, url, params, headers = {}) => {
  let promise;
  const formattedHeaders = new Headers();
  Object.keys(headers).forEach(key => {
    formattedHeaders.append(key, headers[key]);
  });
  switch (method) {
    case "GET":
      promise = httpGET(url, params, formattedHeaders);
      break;
    case "POST":
      promise = httpPOST(url, params, formattedHeaders);
      break;
    default:
      promise = new Error("bad method");
  }
  return promise;
};

export default http;
