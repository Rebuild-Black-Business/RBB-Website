import React, { useState, useRef, useMemo, useEffect } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Box, SimpleGrid, useTheme } from '@chakra-ui/core';

import Button from '../Button';
import Image from '../Image';
import { CardWrapper, CardHeading, CardText, CardContent } from '../Card';
import FundraiserCard from '../Cards/FundraiserCard';
import NoResultsCard from '../Cards/NoResultsCard';
function FundraiserFeed(props) {
  const [allFundraisers] = useState(props.data.allAirtableBusinesses.nodes);
  const [fundraisers, setFundraisers] = useState(allFundraisers);
  const [loaded, setLoaded] = useState(false);
  const focusRef = useRef();
  const theme = useTheme();
  const { name: nameFilter } = props.filters;

  useEffect(() => {
    setLoaded(true);
  }, []);

  useMemo(() => {
    const filteredFundraisers = allFundraisers.filter(fundraiser => {
      if (nameFilter === '' || nameFilter === null) return fundraiser;
      return fundraiser.data['Business_Name']
        .toLowerCase()
        .includes(nameFilter.toLowerCase(), 0);
    });

    setFundraisers(filteredFundraisers);
  }, [nameFilter, allFundraisers]);

  return (
    <Box
      maxW={theme.containers.main}
      paddingX={[null, theme.spacing.base, theme.spacing.lg]}
      marginBottom={theme.spacing.lg}
    >
      {loaded && fundraisers.length > 0 ? (
        <SimpleGrid columns={[null, 1, 3, 4]} spacing={theme.spacing.med}>
          {fundraisers.map(({ data }, index) => {
            if (index === 4)
              return (
                <React.Fragment key={data.ID}>
                  <CardWrapper
                    gridColumn={[null, null, 'span 2']}
                    pr={theme.spacing.lg}
                    pos="relative"
                  >
                    <Image
                      publicId="assets/ally-sign-up"
                      objectFit="cover"
                      pos="absolute"
                      zIndex="-1"
                      w="100%"
                      h="100%"
                      top="0"
                      left="0"
                    />
                    <Image
                      publicId="assets/ally-sign-up"
                      transforms={{
                        fetchFormat: 'auto',
                        quality: 'auto',
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
                        // onClick={onOpen}
                        ref={focusRef}
                      >
                        Spread The Word
                      </Button>
                    </CardContent>
                  </CardWrapper>
                  <FundraiserCard
                    key={data.ID}
                    name={data.Business_Name}
                    donationLink={data.Donation_Link}
                  />
                </React.Fragment>
              );
            return (
              <FundraiserCard
                key={data.ID}
                name={data.Business_Name}
                donationLink={data.Donation_Link}
              />
            );
          })}
        </SimpleGrid>
      ) : (
        <NoResultsCard type="fundraisers" />
      )}
    </Box>
  );
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allAirtableBusinesses(filter: { data: { Donation_Link: { ne: "" } } }) {
          nodes {
            data {
              Donation_Link
              Business_Name
              ID
            }
          }
        }
      }
    `}
    render={data => <FundraiserFeed data={data} {...props} />}
  />
);
