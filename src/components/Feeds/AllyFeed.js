import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Box, SimpleGrid } from '@chakra-ui/core';
import ResultCard from '../ResultCard';

const AllyFeed = data => {
  const [allAllies] = useState(data.data.allAirtableAllies.nodes);

  return (
    <Box maxW="859px">
      {allAllies.length > 0 ? (
        <SimpleGrid columns={[2, 3, 4]} spacing={10}>
          {allAllies.map((allies, index) => (
            <ResultCard
              key={index}
              name={allies.data.Name}
              email={allies.data.Email}
              specialty={allies.data.Specialty}
              location={allies.data.Zip_Code}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Box as="pre">No results...</Box>
      )}
    </Box>
  );
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
