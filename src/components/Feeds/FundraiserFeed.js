import React, { useRef } from 'react';
import { Box, SimpleGrid, useTheme, Skeleton } from '@chakra-ui/core';
import Button from '../Button';
import Image from '../Image';
import { CardWrapper, CardHeading, CardText, CardContent } from '../Card';
import FundraiserCard from '../Cards/FundraiserCard';
import NoResultsCard from '../Cards/NoResultsCard';
import { LOADING_STATE } from '../../hooks/useSearch';
import { FundraiserFilter } from '..';

function FundraiserFeed(props) {
  const focusRef = useRef();
  const theme = useTheme();
  const {
    fundraisers,
    loadingState,
    onSearch,
    selectedFilters,
    onOpen,
  } = props;

  const loaded = loadingState === LOADING_STATE.NONE;
  const isSearching = loadingState === LOADING_STATE.SEARCHING;
  const isInitialLoading = loadingState === LOADING_STATE.INITIAL;

  return (
    <Box
      maxW={theme.containers.main}
      paddingX={[null, theme.spacing.base, theme.spacing.lg]}
      marginBottom={theme.spacing.lg}
    >
      <FundraiserFilter
        onSearch={filters => onSearch(filters)}
        selectedFilters={selectedFilters}
      />

      {(isSearching || isInitialLoading) && (
        <Box mb={10}>
          <SimpleGrid columns={[null, 1, 3, 4]} spacing={theme.spacing.med}>
            {[...Array.from(new Array(16))].map((_, index) => (
              <Skeleton key={index}>
                <FundraiserCard
                  location="none"
                  name="Very Long Dummy Name For Fundraiser"
                  donationLink="Dummy Donation Link"
                />
              </Skeleton>
            ))}
          </SimpleGrid>
        </Box>
      )}

      {!isInitialLoading && fundraisers.length > 0 && !isSearching && (
        <SimpleGrid columns={[null, 1, 3, 4]} spacing={theme.spacing.med}>
          {fundraisers.map((fundraiser, index) => {
            const formattedLocation = `${
              fundraiser.city ? fundraiser.city : ''
            }${fundraiser.city && fundraiser.state ? ', ' : ''}${
              fundraiser.state ? fundraiser.state : ''
            }`;

            if (index === 4)
              return (
                <React.Fragment key={fundraiser.id}>
                  <CardWrapper
                    gridColumn={[null, null, 'span 2']}
                    pr={theme.spacing.lg}
                    pos="relative"
                  >
                    <Image
                      publicId="assets/coffee-shop_rbgwyx"
                      objectFit="cover"
                      pos="absolute"
                      zIndex="-1"
                      w="100%"
                      h="100%"
                      top="0"
                      left="0"
                    />
                    <Image
                      publicId="assets/coffee-shop_rbgwyx"
                      transforms={{
                        fetchFormat: 'auto',
                        quality: 'auto',
                        background: '#000000',
                        effect: 'saturation:-78',
                        opacity: '47',
                      }}
                      objectFit="cover"
                      pos="absolute"
                      zIndex="-1"
                      w="100%"
                      h="100%"
                      top="0"
                      left="0"
                    />
                    <CardContent
                      color={theme.colors['rbb-white']}
                      display="flex"
                      flexDirection="column"
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
                      >
                        Add a fundraiser
                      </CardHeading>
                      <CardText
                        as="p"
                        fontFamily={theme.fonts.heading}
                        fontSize={theme.fontSizes.base}
                      >
                        Do you know of a Black-owned business in need or a group
                        putting together money to help restore Black -owned
                        businesses? Add them to our list so we can spread the
                        word!
                      </CardText>
                      <Button
                        variant="cta"
                        mt={theme.spacing.base}
                        onClick={onOpen}
                        ref={focusRef}
                      >
                        Spread The Word
                      </Button>
                    </CardContent>
                  </CardWrapper>
                  <FundraiserCard
                    location={formattedLocation}
                    name={fundraiser.businessName}
                    donationLink={fundraiser.donationLink}
                  />
                </React.Fragment>
              );
            return (
              <FundraiserCard
                key={fundraiser.id}
                location={formattedLocation}
                name={fundraiser.businessName}
                donationLink={fundraiser.donationLink}
              />
            );
          })}
        </SimpleGrid>
      )}
      {loaded && fundraisers.length === 0 && !isSearching && (
        <NoResultsCard type="fundraisers" />
      )}
    </Box>
  );
}

export default FundraiserFeed;
