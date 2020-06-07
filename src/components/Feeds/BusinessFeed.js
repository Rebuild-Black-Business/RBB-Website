import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import ResultCard from '../ResultCard';
import { Box } from '@chakra-ui/core';

const BusinessesFeed = data => {
  const businesses = data.data.allAirtableBusinesses.nodes;
  return (
    <Box as="pre" whiteSpace="break-spaces">
      {businesses.map(business => (
        <ResultCard
          name={business.data.Business_Name}
          category={business.data.Category}
          description={business.data.Business_Description}
          location={business.data.Zip_Code}
          websiteUrl={business.data.Website}
        />
      ))}
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
