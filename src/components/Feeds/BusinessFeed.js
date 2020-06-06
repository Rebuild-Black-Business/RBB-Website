import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Box } from '@chakra-ui/core';

const BusinessesFeed = data => {
  return (
    <Box as="pre" whiteSpace="break-spaces">
      {JSON.stringify(data, null, 2)}
    </Box>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allAirtableBusinesses {
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
    `}
    render={data => <BusinessesFeed data={data} {...props} />}
  />
);
