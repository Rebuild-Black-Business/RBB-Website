import { useState, useEffect } from 'react';

const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.GATSBY_AIRTABLE_API_KEY }).base(
  process.env.GATSBY_AIRTABLE_BASE_ID
);

export function submitAlly({
  email,
  firstName,
  lastName,
  speciality,
  zipcode,
}) {
  const AirtableData = {
    Email: email,
    Name: `${firstName} ${lastName}`,
    Speciality: speciality,
    'Zip Code': zipcode,
    'First Name': firstName,
    'Last Name': lastName,
  };

  let error = null;

  base('Allies').create(AirtableData, function (err, record) {
    if (err) {
      console.error(err);
      error = err;
    } else console.log(record);
  });

  if (error) return error;
}

export function submitBusiness({
  email,
  businessName,
  category,
  businessDescription,
  phone,
  physicalLocation,
  onlineOnly,
  streetAddress,
  city,
  bizState,
  zipcode,
  serviceArea,
  website,
  yelp,
  adult,
  donationLink,
  story,
  cash,
  check,
  credit,
  bitcoin,
}) {
  const AirtableData = {
    Email: email,
    'Business Name': businessName,
    Category: category,
    'Business Description': businessDescription,
    Phone: phone,
    'Physical Location': physicalLocation,
    'Online Only': onlineOnly,
    'Street Address': streetAddress,
    City: city,
    State: bizState,
    'Zip Code': zipcode,
    'Service Area': serviceArea,
    Website: website,
    Yelp: yelp,
    Adult: adult,
    'Donation Link': donationLink,
    Story: story,
    Cash: cash,
    Check: check,
    Credit: credit,
    Bitcoin: bitcoin,
  };

  let error = null;
  base('Businesses').create(AirtableData, function (err, record) {
    if (err) {
      console.error(err);
      error = err;
    } else console.log(record);
  });
  if (error) return error;
}

//Only fetches from first page of docs for performance concerns.
//If this starts missing select options you can swap .firstPage(()=>{...}) for the following

// .eachPage(function page(records, fetchNextPage) {
//   records.forEach(function(record) {
//     setSpecialities(prev => [...prev, record.get('Speciality')]);
//   });
//   fetchNextPage();
// }, function done(err) {
//   if (err) { console.error(err); return; }
// });

//fetches Ally Specialities dynamically
export function useAllySpecialities() {
  const [specialities, setSpecialities] = useState([]);

  useEffect(() => {
    base('Allies')
      .select({
        fields: ['Speciality'],
      })
      .firstPage((err, records) => {
        if (err) {
          console.error(err);
          return;
        }
        setSpecialities(
          records.map(record => {
            return record.get('Speciality');
          })
        );
      });
  }, []);

  const unique = new Set(specialities);

  return [...unique];
}

//fetches Business Categories dynamically
export function useBusinessCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    base('Businesses')
      .select({
        fields: ['Category'],
      })
      .firstPage((err, records) => {
        if (err) {
          console.error(err);
          return;
        }
        setCategories(
          records.map(record => {
            return record.get('Category');
          })
        );
      });
  }, []);

  const unique = new Set(categories);
  const uniqueWithOther = [...unique].includes('Other')
    ? [...unique]
    : [...unique, 'Other'];

  return uniqueWithOther;
}
