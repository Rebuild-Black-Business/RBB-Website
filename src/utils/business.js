const slugify = require('slugify');

// slug will look something like
// business-name-with-hyphens-rec123456
// where "rec123456" is the airtable ID for this business
exports.getSlugForBusiness = business =>
  `${slugify(business.data.Business_Name).toLowerCase()}-${business.recordId}`;
