import React, { useEffect, useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Flex, Heading, Box } from '@chakra-ui/core';

import ResourceFilter from '../Filters/ResourceFilter';

const SupportingOrgs = data => {
  const [searchFilters, setSearchFilters] = useState({
    role: '',
    location: '',
  });
  const [allOrgs] = useState(data.data.allAirtableSupportOrgs.nodes);
  const [orgs, setOrgs] = useState(allOrgs);
  console.log('search filters', searchFilters);
  console.log('allOrgs', allOrgs);
  console.log('orgs', orgs);

  useEffect(() => {
    const filteredResults = allOrgs.filter(org => {
      const input = searchFilters.location.toLowerCase();
      const orgName = org.data['Location__Zip_Code_'].toLowerCase();
      return orgName.includes(input);
    });
    setOrgs(filteredResults);
  }, [searchFilters.location, allOrgs]);

  return (
    <>
      <Flex align="center" justify="center">
        <Heading as="h3" size="lg">
          Supporting Orgs
        </Heading>
      </Flex>
      <ResourceFilter onSearch={filters => setSearchFilters(filters)} />
      {orgs && <Box as="pre">{JSON.stringify(orgs, null, 2)}</Box>}
    </>
  );
};

// allAirtableSupportOrgs(filter: {data: {Location__Zip_Code_: {regex: "/At/gi"}}}) {
//   edges {
//     node {
//       data {
//         Name
//         Location__Zip_Code_
//         Website
//       }
//     }
//   }
// }

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
