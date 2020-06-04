import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Box } from '@chakra-ui/core';

const SupportingOrgs = data => {
  return <Box as="pre">{JSON.stringify(data, null, 2)}</Box>;
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allAirtableBlackOwnedBiz {
          nodes {
            data {
              Business_Name
              Category
              CreatedAt
              Email
              ID
              Name
              Website
            }
          }
        }
      }
    `}
    render={data => <SupportingOrgs data={data} {...props} />}
  />
);
