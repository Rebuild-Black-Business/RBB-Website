import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Box } from '@chakra-ui/core';

const AllyFeed = data => {
  return <Box as="pre">{JSON.stringify(data, null, 2)}</Box>;
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allAirtableAllies {
          nodes {
            data {
              Email
              Name
              Speciality
              Zip_Code
              CreatedAt
            }
          }
        }
      }
    `}
    render={data => <AllyFeed data={data} {...props} />}
  />
);
