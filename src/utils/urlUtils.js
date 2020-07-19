export const setUrlUtm = url => {
  if (
    // Ensure that the link is external and follows http protocol (as opposed to mailto)
    !url.includes('rebuildblackbusiness.com') &&
    url.includes('http')
  ) {
    try {
      url = new URL('', url);
    } catch (e) {
      return null;
    }

    if (!url.search) {
      // Set the one and only query
      url += '?utm_source=Rebuild+Black+Business';
    } else if (!url.search?.includes('utm_source')) {
      // Append if there are multiple queries and no utm_source
      const urlString = url.toString();
      const index = urlString.indexOf('?') + 1;
      url =
        urlString.slice(0, index) +
        'utm_source=Rebuild+Black+Business&' +
        urlString.slice(index);
    }
  }

  return url.toString();
};
