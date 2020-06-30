const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.GATSBY_AIRTABLE_API_KEY }).base(
  process.env.GATSBY_AIRTABLE_BASE_ID
);

export function submitAlly({ email, firstName, skill, zipcode, lastName }) {
  const AirtableData = {
    fields: {
      Email: email,
      Name: `${firstName} ${lastName}`,
      Specialty: skill,
      'Zip Code': zipcode,
      'First Name': firstName,
      'Last Name': lastName,
    },
  };

  base('Allies').create(AirtableData, function (err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record);
  });
}

export function submitBusiness({
  email,
  firstName,
  lastName,
  businessName,
  category,
  businessDescription,
  businessWebsite,
  physicalLocation,
  directlyAffected,
}) {
  const AirtableData = {
    fields: {
      Email: email,
      Name: `${firstName} ${lastName}`,
      'Business Name': businessName,
      Category: category,
      'Business Description': businessDescription,
      Website: businessWebsite,
      'Physical Location': physicalLocation,
      'Directly Affected': directlyAffected,
    },
  };

  base('Businesses').create(AirtableData, function (err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record);
  });
}
