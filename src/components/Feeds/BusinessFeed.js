import { Box, SimpleGrid, useTheme, Skeleton } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import NoResultsCard from '../Cards/NoResultsCard';
import BusinessFilter from '../Filters/BusinessFilter';
import { LOADING_STATE } from '../../hooks/useSearch';
import ResultCard from '../ResultCard';
import { verifyHttpUrl } from '../../utils/urlUtils';
import RegistrationPromo from '../Promos/RegistrationPromo';
import { scrollToId } from '../../utils/scrollToId';

function BusinessFeed({
  businesses,
  onSearch,
  selectedFilters,
  loadingState,
  onOpen,
}) {
  const theme = useTheme();

  const loaded = loadingState === LOADING_STATE.NONE;
  const initialLoad = loadingState === LOADING_STATE.INITIAL;
  const searching = loadingState === LOADING_STATE.SEARCHING;

  const hasResults = businesses.length > 0;
  useEffect(() => {
    if (window && window.location.hash) {
      window.setTimeout(() => {
        scrollToId(window.location.hash);
      }, 200);
    }
  }, [loaded]);

  return (
    <Box
      maxW={theme.containers.lg}
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
          <SimpleGrid columns={[null, 1, 2, 3, 4]} spacing={10}>
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
          <SimpleGrid id="results" columns={[null, 1, 2, 3, 4]} spacing={10}>
            {businesses.map((business, index) => {
              const formattedLocation = `${business.city ? business.city : ''}${
                business.city && business.state ? ', ' : ''
              }${business.state ? business.state : ''}`;

              if (index === 3) {
                return [
                  <RegistrationPromo
                    onOpen={onOpen}
                    key="registration-promo"
                  />,
                  <ResultCard
                    id={business.id}
                    airTableId={business.airTableId}
                    key={business.id}
                    name={business.businessName || business.name}
                    category={business.category}
                    description={business.description}
                    location={formattedLocation}
                    websiteUrl={business.site}
                    donationUrl={business.donationLink}
                  />,
                ];
              }
              return (
                <ResultCard
                  id={business.id}
                  airTableId={business.airTableId}
                  key={business.id}
                  name={business.businessName || business.name}
                  category={business.category}
                  description={business.description}
                  location={formattedLocation}
                  websiteUrl={verifyHttpUrl(business.site)}
                  donationUrl={verifyHttpUrl(business.donationLink)}
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
  loadingState: PropTypes.string.isRequired,
};

export default BusinessFeed;
