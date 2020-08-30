const slugify = require('slugify');

// slug will look something like
// business-name-with-hyphens-rec123456
// where "rec123456" is the airtable ID for this business
// fallback is to generate a slug of _just_ the airtable id if no name is provided
exports.getSlugForBusiness = ({ name, businessName, airtableId }) => {
  if (!airtableId) {
    console.warn('No unique ID provided - cannot generate URL');
    return null;
  }
  if (!name && !businessName) {
    console.warn(
      `Business with ID ${airtableId} doesn't have a name set. Generating ID-only slug`
    );
  }
  return `${slugify(businessName || name).toLowerCase()}-${airtableId}`;
};
