import React, { useMemo, useState } from 'react';

import ResultCard from '../ResultCard';
import NoResultsCard from '../Cards/NoResultsCard';
import { Box, SimpleGrid, useTheme } from '@chakra-ui/core';

import BusinessFilter from '../Filters/BusinessFilter';
import { getLocationZip } from '../../utils/locationUtils';
import Pagination from '../Pagination/Pagination.jsx';

export default data => {
  const [businessFilters, setBusinessFilters] = useState({
    type: '',
    location: '',
    need: 'true',
  });

  const [allBusinesses] = useState(data.data.allAirtableBusinesses.nodes);
  const [businesses, setBusinesses] = useState(allBusinesses);
  const theme = useTheme();

  useMemo(() => {
    const associatedZipCodes = getLocationZip(businessFilters.location);
    const filteredBusinesses = allBusinesses
      .filter(biz => {
        // Need filter
        if (businessFilters.need === 'true') {
          return biz.data['In_Need'];
        } else {
          return biz;
        }
      })
      .filter(biz => {
        // Category filter
        if (businessFilters.type === '') return biz;
        return biz.data['Category'].toLowerCase() ===
          businessFilters.type.toLowerCase()
          ? biz
          : null;
      })
      .filter(biz => {
        // Return when no location entered
        if (businessFilters.location === '') return biz;
        return associatedZipCodes.includes(biz.data['Zip_Code']) ? biz : null;
      });

    setBusinesses(filteredBusinesses);
  }, [businessFilters, allBusinesses]);

  return (
    <Box
      maxW={theme.containers.main}
      paddingX={[null, theme.spacing.base, theme.spacing.lg]}
    >
      <BusinessFilter onSearch={filters => setBusinessFilters(filters)} />
      {businesses.length > 0 ? (
        <SimpleGrid columns={[null, 1, 2]} spacing={10}>
          {businesses.map((business, index) => {
            return (
              <ResultCard
                key={index}
                imageSrc={business.data.Image}
                name={business.data.Business_Name}
                category={business.data.Category}
                description={business.data.Business_Description}
                location={business.data.Zip_Code}
                websiteUrl={business.data.Website}
              />
            );
          })}
        </SimpleGrid>
      ) : (
        <NoResultsCard type="businesses" />
      )}
      {businesses.length > 0 && (
        <Pagination
          totalRecords={data.pageContext.totalRecords}
          pageLimit={data.pageContext.itemsPerPage}
        />
      )}
    </Box>
  );
};
