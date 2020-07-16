import React from 'react';
import { Box, Heading, Text, useTheme } from '@chakra-ui/core';
import BusinessSignUpForm from '../Forms/BusinessSignUpForm';
import AllySignUpForm from '../Forms/AllySignUpForm';

const NoResultsCard = ({ type }) => {
  const theme = useTheme();

  return (
    <Box
      bg="rbb-light-gray"
      padding={[theme.spacing.base, theme.spacing.lg]}
      marginBottom={[theme.spacing.base, theme.spacing.lg]}
    >
      <Heading
        data-testid="heading"
        fontFamily={theme.fonts['heading-slab']}
        lineHeight="1.2"
        size="lg"
        textAlign="center"
        textTransform="uppercase"
      >
        Sorry, No {type} Matched This Search.
      </Heading>
      {type === 'allies' && (
        <>
          <Text
            data-testid="subheading"
            my={theme.spacing.base}
            textAlign="center"
          >
            {/* TODO: the "your area" copy needs to be dynamically generated based on filters */}
            We’d love to have Allies in your area. If you’ve got skills to
            assist Black-owned businesses, sign up to be added.
          </Text>
          <AllySignUpForm />
        </>
      )}

      {type === 'businesses' && (
        <>
          <Text
            data-testid="subheading"
            my={theme.spacing.base}
            textAlign="center"
          >
            {/* TODO: the "your area" copy needs to be dynamically generated based on filters */}
            We’d love to support Black-owned businesses in your city. Is there a
            Black-owned business we should know about? Register a business below
            and we’ll add them to our public directory. If they are in urgent
            need, include a donation link.
          </Text>

          <BusinessSignUpForm />
        </>
      )}
    </Box>
  );
};

export default NoResultsCard;
