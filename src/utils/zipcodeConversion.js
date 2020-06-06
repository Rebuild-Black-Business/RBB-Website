import zipcodes from 'zipcodes';

const zipcodeConversion = zipcode => {
  try {
    let convertedZipcode = zipcodes.lookup(zipcode);
    if (!convertedZipcode) throw error;
    return convertedZipcode;
  } catch (error) {
    console.log(
      'Sorry, zipcode is invalid. Please check your input and try again.'
    );
  }
};

export default zipcodeConversion;
