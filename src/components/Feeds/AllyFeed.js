import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Box, SimpleGrid, useTheme } from '@chakra-ui/core';
import AllyCard from '../Cards/AllyCard';

const AllyFeed = data => {
  const [allAllies] = useState(data.data.allAirtableAllies.nodes);
  const theme = useTheme();

  return (
    <Box
      maxW={theme.containers.main}
      paddingX={[null, theme.spacing.base, theme.spacing.lg]}
    >
      {allAllies.length > 0 ? (
        <SimpleGrid
          columns={[null, null, 2, 4]}
          spacing={theme.spacing.med}
          paddingBottom={theme.spacing.lg}
        >
          {allAllies.map((allies, index) => (
            <AllyCard
              key={index}
              name={allies.data.Name}
              email={allies.data.Email}
              specialty={allies.data.Speciality}
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
