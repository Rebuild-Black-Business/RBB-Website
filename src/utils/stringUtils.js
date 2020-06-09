export const toCamelCase = string => {
  string = string
    .toLowerCase()
    .replace(/(?:(^.)|([-_\s]+.))/g, function (match) {
      return match.charAt(match.length - 1).toUpperCase();
    });
  return string.charAt(0).toLowerCase() + string.substring(1);
};
