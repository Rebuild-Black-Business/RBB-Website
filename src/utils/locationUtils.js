import zipcodes from 'zipcodes';

export function getLocationZip(locationString) {
  if (locationString.includes(',')) {
    const citystateArray = locationString.split(', ');
    return zipcodes.lookupByName(citystateArray[0], citystateArray[1]);
  } else {
    return parseInt(locationString);
  }
}
