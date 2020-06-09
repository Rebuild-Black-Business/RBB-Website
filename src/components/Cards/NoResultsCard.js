import React from 'react';
import { Box, Heading, Text, useTheme } from '@chakra-ui/core';

const NoResultsCard = ({ type }) => {
  const theme = useTheme();

  return (
    <Box bg="rbb-light-gray" padding="1.5rem 2rem">
      <Heading
        fontFamily={theme.fonts['heading-slab']}
        lineHeight="1.2"
        size="lg"
        textAlign="center"
        textTransform="uppercase"
      >
        Sorry, No {type} Matched This Search.
      </Heading>
      <Text margin="1.5rem 0" textAlign="center">
        {/* TODO: this copy needs to be dynamically generated based on filters */}
        We don’t have any {type} that match your search.
      </Text>

      {/*
        TODO: probably need a form embed ID/component/prop if the 
        forms are different between business and allies
      */}
      <pre>TODO: embed Airtable form here</pre>
    </Box>
  );
};

export default NoResultsCard;
