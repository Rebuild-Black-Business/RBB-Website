import zipcodes from 'zipcodes';

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
