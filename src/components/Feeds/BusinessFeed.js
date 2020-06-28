import { Box, SimpleGrid, useTheme, Skeleton } from '@chakra-ui/core';
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
  const searching = loadingState === LOADING_STATE.SEARCHING;

  const hasResults = businesses.length > 0;

  return (
    <Box
      maxW={theme.containers.main}
      paddingX={[null, theme.spacing.base, theme.spacing.lg]}
      width="100%"
    >
      <BusinessFilter
        onSearch={filters => onSearch(filters)}
        selectedFilters={selectedFilters}
        isSearching={loadingState === LOADING_STATE.SEARCHING}
      />
      {(searching || initialLoad) && (
        <Box mb={10}>
          <SimpleGrid columns={[null, 1, 2]} spacing={10}>
            {[...Array.from(new Array(20))].map((_, index) => (
              <Skeleton key={index}>
                <ResultCard
                  category={{ id: 1, name: 'Entertainment' }}
                  name="Saving Small Businesses In Chicago- Skyway Bowl"
                  description="PlaceHolder Description"
                  location="Placeholder Location"
                  donationUrl="Placeholder Url"
                />
              </Skeleton>
            ))}
          </SimpleGrid>
        </Box>
      )}

      {!initialLoad && hasResults && !searching && (
        <>
          <SimpleGrid columns={[null, 1, 2]} spacing={10}>
            {businesses.map(business => {
              const formattedLocation = `${business.city ? business.city : ''}${
                business.city && business.state ? ', ' : ''
              }${business.state ? business.state : ''}`;
              return (
                <ResultCard
                  key={business.id}
                  name={business.businessName || business.name}
                  category={business.category}
                  description={business.description}
                  location={formattedLocation}
                  websiteUrl={business.site}
                  donationUrl={business.donationLink}
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
