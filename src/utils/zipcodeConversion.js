import zipcodes from 'zipcodes';

const zipcodeConversion = zipcode => {
  try {
    let convertedZipcode = zipcodes.lookup(zipcode);
    let error =
      'Sorry, zipcode is invalid. Please check your input and try again.';
    if (!convertedZipcode) throw error;
    return convertedZipcode;
  } catch (error) {
    console.log(error);
  }
};

export default zipcodeConversion;
