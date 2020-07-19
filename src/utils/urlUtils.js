export const setUrlUtm = url => {
  // basic error checking
  if (!url) return null;

  // make sure we're formatting an external URL that contains http
  if (url.includes('rebuildblackbusiness.com')) return url;
  if (!url.includes('http')) return url;

  try {
    let formattedURL = new URL('', url);

    if (!formattedURL.search) {
      // Set the one and only query
      formattedURL += '?utm_source=Rebuild+Black+Business';
    } else if (!formattedURL.search?.includes('utm_source')) {
      // Append if there are multiple queries and no utm_source
      const urlString = formattedURL.toString();
      const index = urlString.indexOf('?') + 1;
      formattedURL =
        urlString.slice(0, index) +
        'utm_source=Rebuild+Black+Business&' +
        urlString.slice(index);
    }
    return formattedURL.toString();
  } catch (e) {
    // something went wrong, let's just try to return the input URL
    return url.toString();
  }
};
