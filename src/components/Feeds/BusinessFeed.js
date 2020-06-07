import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import ResultCard from '../ResultCard';
import { Box } from '@chakra-ui/core';

const BusinessesFeed = data => {
  return (
    <Box as="pre" whiteSpace="break-spaces">
      {data.data.allAirtableBusinesses.nodes.map(item => (
        <ResultCard
          name={item.data.Business_Name}
          category={item.data.Category}
          description={item.data.Business_Description}
          location={item.data.zip_code}
          websiteUrl={item.data.Website}
          donationUrl={item.data.donationUrl}
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
