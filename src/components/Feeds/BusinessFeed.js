import { Box, SimpleGrid, useTheme } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import NoResultsCard from '../Cards/NoResultsCard';
import BusinessFilter from '../Filters/BusinessFilter';
import { LOADING_STATE } from '../../hooks/useSearch';

import ResultCard from '../ResultCard';

function BusinessFeed({ businesses, onSearch, selectedFilters, loadingState }) {
  const theme = useTheme();

  const loaded = loadingState === LOADING_STATE.NONE;
  const initialLoad = loadingState === LOADING_STATE.INITIAL;
  const hasResults = businesses.length > 0;

  return (
    <Box
      maxW={theme.containers.main}
      paddingX={[null, theme.spacing.base, theme.spacing.lg]}
    >
      <BusinessFilter
        onSearch={filters => onSearch(filters)}
        selectedFilters={selectedFilters}
        isSearching={loadingState === LOADING_STATE.SEARCHING}
      />
      {!initialLoad && hasResults && (
        <>
          <SimpleGrid columns={[null, 1, 2]} spacing={10}>
            {businesses.map(business => {
              const formattedLocation = `${business.city ? business.city : ''}${
                business.city && business.state ? ', ' : ''
              }${business.state ? business.state : ''}`;
              return (
                <ResultCard
                  key={business.objectID}
                  name={business.businessName || business.name}
                  category={business.category}
                  description={business.description}
                  location={formattedLocation}
                  websiteUrl={business.website}
                  donationUrl={business.donation_link}
                />
              );
            })}
          </SimpleGrid>
        </>
      )}
      {loaded && !hasResults && <NoResultsCard type="businesses" />}
    </Box>
  );
}

BusinessFeed.propTypes = {
  businesses: PropTypes.arrayOf(PropTypes.object),
  onSearch: PropTypes.func.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  loadingState: PropTypes.object.isRequired,
};

export default BusinessFeed;
