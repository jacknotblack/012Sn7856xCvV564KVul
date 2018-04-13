const httpHelpers = {
  urlencode: (url, params) => {
    const parsedParams =
      params === undefined || Object.keys(params).length === 0
        ? ""
        : `?${Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join("&")}`;
    const urlWithParams = encodeURIComponent(`${url}${[parsedParams]}`);
    return urlWithParams;
  }
};
export default httpHelpers;
