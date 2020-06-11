export function getLocationZip(locationString) {
  if (locationString.includes(',')) {
    const citystateArray = locationString.split(', ');
    const zipAndCoordinates = zipcodes.lookupByName(
      citystateArray[0],
      citystateArray[1]
    );
    return zipAndCoordinates.map(location => parseInt(location.zip));
  } else {
    return [parseInt(locationString)];
  }
}

export function getZipcodesByRadius(zipcode, miles) {
  if (zipcode.length < 5) return [];
  return zipcodes.radius(zipcode, miles);
}
