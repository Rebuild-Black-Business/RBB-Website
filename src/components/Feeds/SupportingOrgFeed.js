import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Flex, Heading, Box } from '@chakra-ui/core';

import ResourceFilter from '../Filters/ResourceFilter';

const SupportingOrgs = data => {
  const [searchFilters, setSearchFilters] = useState(null);
  console.log('search filters', searchFilters);

  return (
    <>
      <Flex align="center" justify="center">
        <Heading as="h3" size="lg">
          Supporting Orgs
        </Heading>
      </Flex>
      <ResourceFilter onSearch={filters => setSearchFilters(filters)} />
      <Box as="pre">{JSON.stringify(data, null, 2)}</Box>
    </>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allAirtableSupportOrgs {
          nodes {
            data {
              Category
              CreatedAt
              Email
              Location__Zip_Code_
              Name
              Service_Org_Name
              Website
            }
          }
        }
      }
    `}
    render={data => <SupportingOrgs data={data} {...props} />}
  />
);
