const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.GATSBY_AIRTABLE_API_KEY }).base(
  process.env.GATSBY_AIRTABLE_BASE_ID
);

export function submitAlly({ email, firstName, lastName, skill, zipcode }) {
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
