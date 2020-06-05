import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Box } from '@chakra-ui/core';

const Businesses = data => {
  return (
    <Box as="ul">
      {data.allAirtableBizInNeed.edges.map(({ node: { data } }) => (
        <Box as="li" itemScope itemType={`http://schema.org/${data.Category}`}>
          {/* the category in Airtable isn't going to match the schema category, will need to be fixed */}
          <h2 itemprop="name">{data.Name}</h2>
          <h4 itemprop="address">{data.Location}</h4>
          {/* it would be good to get more address details as well */}
          <span itemprop="email">{data.Email}</span>
          <a href={data.Donation_Website}>Donate</a>
        </Box>
      ))}
    </Box>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query AllApprovedBizInNeed {
        allAirtableBizInNeed(filter: { data: { Approved: { eq: true } } }) {
          edges {
            node {
              data {
                Approved
                Category
                Donation_Website
                Email
                Impacted_Business_Name
                Location
                Name
                Other_Applicable_Links
              }
            }
          }
        }
      }
    `}
    render={data => <Businesses data={data} {...props} />}
  />
);
