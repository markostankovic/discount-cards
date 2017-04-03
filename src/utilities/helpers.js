function serializeUrl(queryObject, urlMap) {
  const keyValuePairs = [];

  for (const key in queryObject) {
    if (queryObject[key]) {
      const urlKey = urlMap ? urlMap[key] : key;

      keyValuePairs.push(urlKey + '=' + encodeURIComponent(queryObject[key]));
    }
  }

  return keyValuePairs.join('&');
}

export {
  serializeUrl,
};