import { Box, SimpleGrid, useTheme, Skeleton } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import NoResultsCard from '../Cards/NoResultsCard';
import BusinessFilter from '../Filters/BusinessFilter';
import { LOADING_STATE } from '../../hooks/useSearch';
import { CardWrapper, CardHeading, CardText, CardContent } from '../Card';
import ResultCard from '../ResultCard';
import Button from '../Button';
import Image from '../Image';

function BusinessFeed({
  businesses,
  onSearch,
  selectedFilters,
  loadingState,
  onOpen,
}) {
  const focusRef = useRef();
  const theme = useTheme();

  const loaded = loadingState === LOADING_STATE.NONE;
  const initialLoad = loadingState === LOADING_STATE.INITIAL;
  const searching = loadingState === LOADING_STATE.SEARCHING;

  const hasResults = businesses.length > 0;

  const RegistrationPromo = () => (
    <CardWrapper pos="relative">
      <Image
        publicId="assets/looking-up_whbkeh.jpg"
        objectFit="cover"
        pos="absolute"
        zIndex="-1"
        w="100%"
        h="100%"
        top="0"
        left="0"
        alt="looking-ip_whbkeh"
      />
      <CardContent
        color={theme.colors['rbb-black-200']}
        display="flex"
        flexDirection="column"
        h="100%"
        justifyContent="space-between"
      >
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <CardHeading
            fontFamily={theme.fonts['heading-slab']}
            textTransform="uppercase"
            fontSize={theme.fontSizes.xl}
            lineHeight="1"
            overflowWrap="break-word"
            wordWrap="break-word"
            wordBreak="break-word"
            hyphens="auto"
            mb={theme.spacing.lg}
            fontWeight={theme.fontWeights[900]}
          >
            Add a business
          </CardHeading>
          <CardText
            as="p"
            fontFamily={theme.fonts.heading}
            fontSize={theme.fontSizes.base}
            mb={theme.spacing.lg}
          >
            If you are a business owner that has been impacted, please send us
            your information. New submissions are added every 24 hours.
          </CardText>
        </Box>
        <Button
          variant="cta"
          mt={theme.spacing.base}
          onClick={onOpen}
          ref={focusRef}
          mb={theme.spacing.lg}
        >
          Register
        </Button>
      </CardContent>
    </CardWrapper>
  );

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
            {businesses.map((business, index) => {
              const formattedLocation = `${business.city ? business.city : ''}${
                business.city && business.state ? ', ' : ''
              }${business.state ? business.state : ''}`;

              if (index === 3) {
                return <RegistrationPromo />;
              }
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
