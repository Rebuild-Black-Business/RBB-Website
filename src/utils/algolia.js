const businessQuery = `
  query($itemsPerPage: Int!, $skip: Int!) {
    allAirtableBusinesses(limit: $itemsPerPage, skip: $skip) {
      nodes {
        data {
          Email
          Name
          Business_Name
          Category
          Zip_Code
          Business_Description
          Website
          Donation_Link
          In_Need
          CreatedAt
        }
      }
    }
  }
`;

const settings = {};

const queries = [
  {
    query: businessQuery,
    transformer: ({ data }) => data,
    indexName: `businesses`,
    settings,
  },
];

module.exports = queries;
