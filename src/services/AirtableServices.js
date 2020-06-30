import 'gatsby';

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

  console.log('env', process.env.GATSBY_AIRTABLE_API_KEY);

  fetch('https://api.airtable.com/v0/appkenjGlBB01wr3i/Allies', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GATSBY_AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(AirtableData),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}
